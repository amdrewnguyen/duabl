import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchTask,
         updateTask,
         createTask,
         deleteTask } from '../../actions/task_actions';
import DetailsHeader from './details_view_header';
import DoneToggle from '../widgets/done_toggle';
import SubtaskList from './subtask_list';
import { receivePath, updateSelectedTask } from '../../actions/ui_actions';


const mapStateToProps = (state, ownProps) => {
  return {
    task: state.entities.tasks[ownProps.taskId],
    projectId: state.ui.projectId,
    taskId: ownProps.taskId,
    selectedTaskId: state.ui.selectedTaskId,
    selectedTaskName: state.ui.selectedTaskName,
    selectedTask: state.ui.selectedTask,
    selected: Boolean(ownProps.taskId === state.ui.selectedTaskId),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    fetchTask: (taskId) => dispatch(fetchTask(taskId)),
    updateTask: (task) => dispatch(updateTask(task)),
    createTask: (task) => dispatch(createTask(task)),
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    receivePath: (params) => dispatch(receivePath(params)),
    updateSelectedTask: (value) => dispatch(updateSelectedTask(value)),
  }
);

class DetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false, task: props.task, selectedTaskName: props.selectedTaskName};
    this.saveTimerId = null;
    this.updateField = this.updateField.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeLinked = this.handleChangeLinked.bind(this);
  }

  componentDidMount() {
    if (!this.props.task && this.props.taskId !== 'list') {
      this.props.fetchTask(this.props.taskId)
        .then(
          () => this.setState({task: this.props.task, loaded: true, selectedTaskName: this.props.selectedTaskName})
        );
    }
  }

  componentWillReceiveProps(newProps) {
    if ((newProps.taskId !== "list") && (newProps.taskId !== this.props.taskId)) {
      // this.setState({loaded: false});
      this.props.fetchTask(newProps.taskId)
        .then(
          () => this.setState({task: this.props.task, taskId: this.props.taskId, loaded: true})
        );
    } else if (newProps.task !== this.props.task) {
      this.setState({task: newProps.task, taskId: newProps.taskId, loaded: true});
    }
    // if (newProps.selectedTaskName !== this.props.selectedTaskName) {
    //   this.setState({selectedTaskName: newProps.selectedTaskName});
    // }
  }

  updateField(field) {
    return (e) => {
      const newTask = Object.assign({}, this.state.task, {[field]: e.currentTarget.value});
      this.setState({ task: newTask });
      if (this.saveTimerId) clearTimeout(this.saveTimerId);

      this.saveTimerId = setTimeout(
        () => {
          this.props.updateTask(this.state.task);
          this.saveTimerId = null;
        },
        1500
      );
    };
  }

  handleChangeLinked(e) {
    this.props.updateSelectedTask(e.currentTarget.value);
    if (this.saveTimerId) clearTimeout(this.saveTimerId);

    this.saveTimerId = setTimeout(
      () => {
        this.props.updateTask(Object.assign({}, this.state, {name: this.state.selectedTaskName}));
        this.saveTimerId = null;
      },
      1500
    );
  }

  handleDelete(e) {
    this.props.deleteTask(this.props.taskId)
      .then(
        () => {
          let task = {name: "", description: ""};
          this.props.history.push(`/${this.props.projectId}/list`);
        }
      );
  }

  render() {
    if (this.state.taskId === "list") return null;
    if (this.state.loaded && this.state.task) {
      return (
        <div className="details-view">
          <DetailsHeader task={this.state.task}
                         updateTask={this.props.updateTask}
                         createTask={this.props.createTask}
                         deleteTask={this.handleDelete} />
          <div className="details-name">
            <DoneToggle task={this.state.task} updateTask={this.props.updateTask}/>
            <textarea
              value={this.state.task.name || ""}
              onChange={this.updateField("name")}
            />
          </div>
          <textarea className="details-description"
                    value={this.state.task.description || ""}
                    placeholder="Description"
                    onChange={this.updateField("description")} />
          <SubtaskList taskId={this.props.taskId} />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsView));
