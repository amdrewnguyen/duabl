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


const mapStateToProps = (state, ownProps) => {
  let task = null;
  const taskId = ownProps.match.params.taskId;

  if (taskId === 'list') {
    return { task, taskId, show: false};
  } else {
    task = state.entities.tasks[taskId];
    return { task, taskId, show: (task ? true : false) };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    fetchTask: (taskId) => dispatch(fetchTask(taskId)),
    updateTask: (task) => dispatch(updateTask(task)),
    createTask: (task) => dispatch(createTask(task)),
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
  }
);

class DetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, task: this.props.task, taskId: this.props.taskId };
    this.saveTimerId = null;
    this.updateField = this.updateField.bind(this);
  }

  componentDidMount() {
    if (!this.props.task && this.props.match.params.taskId !== 'list') {
      this.props.fetchTask(this.props.match.params.taskId)
        .then(
          () => this.setState({task: this.props.task, loaded: true})
        );
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({task: newProps.task, taskId: newProps.match.params.taskId});
    if (newProps.match.params.taskId !== "list" && newProps.match.params.taskId !== this.props.match.params.taskId) {
      this.setState({loaded: false, taskId: newProps.match.params.taskId});
      this.props.fetchTask(newProps.match.params.taskId)
        .then(
          () => this.setState({task: this.props.task, taskId: this.props.taskId, loaded: true})
        );
    }
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

  render() {
    if (this.props.taskId === "list") return null;
    return (
      (this.state.task) ? (
          <div className="details-view">
            <DetailsHeader task={this.props.task}
                           updateTask={this.props.updateTask}
                           createTask={this.props.createTask}
                           deleteTask={this.props.deleteTask} />
            <div className="details-name">
              <DoneToggle task={this.props.task} updateTask={this.props.updateTask}/>
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
        ) : (
          null
        )
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsView);
