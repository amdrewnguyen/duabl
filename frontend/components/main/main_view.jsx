import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Route } from 'react-router-dom';

import PageHeader from './page_header';
import TaskListView from './task_list_view';
import DetailsView from './details_view';
import { updateTask, fetchTasks } from '../../actions/task_actions';
import { fetchProject } from '../../actions/project_actions';
import { receivePath } from '../../actions/ui_actions';


const mapStateToProps = (state, ownProps) => {
  const projectId = ownProps.match.params.projectId;
  const taskId = ownProps.match.params.taskId;
  const project = state.entities.projects.items[projectId];

  return {
    projectId,
    taskId,
    project,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    receivePath: (params) => dispatch(receivePath(params)),
    fetchTasks: () => dispatch(fetchTasks()),
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
  }
);

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props, {loaded: false, updateDetailsName: null, updateTaskListName: null});
  }

  componentDidMount() {

    this.props.receivePath(this.props.match.params);
    this.props.fetchProject(this.props.match.params.projectId)
      .then(
        () => {
          this.props.fetchTasks()
            .then(
              () => this.setState(
                {taskId: this.props.taskId,
                 projectId: this.props.projectId,
                 project: this.props.project,
                 loaded: true}
               )
            );
          }
        );
  }


  componentWillReceiveProps(newProps) {
    if (newProps.match.params.projectId !== this.props.match.params.projectId) {
      this.setState({projectId: newProps.match.params.projectId});
      this.props.receivePath(newProps.match.params);
    }


    if (newProps.match.params.taskId !== this.props.match.params.taskId) {
      this.setState({taskId: newProps.match.params.taskId});
      this.props.receivePath(newProps.match.params);
    }

    if (this.props.task !== newProps.task) {
      this.setState({task: newProps.task, taskId: newProps.task.id, loaded: true});
    }
  }

  setUpdateTaskListName(cb) {
    this.setState({updateTaskListName: cb});
  }

  setUpdateDetailsName(cb) {
    this.setState({updateDetailsName: cb});
  }

  updateDetailsName(value) {
    if (this.state.updateDetailsName) {
      this.state.updateDetailsName(value);
    }
  }

  updateTaskListName(key, value) {
    if (this.state.updateTaskListName) {
      this.state.updateTaskListName(key, value);
    }
  }

  render() {
    let { projectId, taskId } = this.state;
    if (this.state.loaded) {
      return (
        <div className="main-view">
          <PageHeader projectId={projectId} />
          <TaskListView projectId={projectId}
                        sendUpdateTaskListName={this.setUpdateTaskListName.bind(this)}
                        updateDetailsName={this.updateDetailsName.bind(this)}/>
          <DetailsView taskId={taskId}
                       sendUpdateDetailsName={this.setUpdateDetailsName.bind(this)}
                       updateTaskListName={this.updateTaskListName.bind(this)}/>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainView)
;
