import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchProjectTasks,
         updateTask,
         createTask } from '../../actions/task_actions';
import { fetchProject } from '../../actions/project_actions';
import TaskListHeader from './task_list_view_header';
import TaskListItem from './task_list_view_item';
import { receivePath } from '../../actions/ui_actions';
import { getTasks } from '../../util/selectors';


const mapStateToProps = (state, ownProps) => {
  let project = state.entities.projects.items[ownProps.projectId];
  let tasks;
  if (project && state.entities.tasks) {
    tasks = getTasks(state.entities.tasks, project);
  }
  return {
    tasks,
    projectId: ownProps.projectId,
    taskId: state.ui.taskId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    fetchProjectTasks: (projectId) => dispatch(fetchProjectTasks(projectId)),
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
    updateTask: (task) => dispatch(updateTask(task)),
    createTask: (task) => dispatch(createTask(task)),
    receivePath: (params) => dispatch(receivePath(params)),
  }
);

class TaskListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: props.tasks, loaded: false };
    this.addNewTask = this.addNewTask.bind(this);
  }

  componentDidMount() {
    console.log("Project ID is: " + this.props.projectId);
    if(!this.props.project) {
      this.props.fetchProject(this.props.projectId)
        .then(
          () => {
            this.props.fetchProjectTasks(this.props.projectId)
              .then(
                () => this.setState({tasks: this.props.tasks, loaded: true})
              );
          }
        );
    }
  }

  componentWillReceiveProps(newProps) {

    if (newProps.projectId !== this.props.projectId) {
      this.setState({loaded: false});
      this.props.fetchProject(newProps.projectId)
        .then(
          () => {
            this.props.fetchProjectTasks(newProps.projectId)
              .then(
                () => this.setState({tasks: this.props.tasks, loaded: true})
              );
          }
        );
    }
  }

  addNewTask() {
    const newBlankTask = {name: "", project_id: this.props.projectId};
    this.props.createTask(newBlankTask);
  }

  render() {
    const { projectId, updateTask } = this.props;
    let tasks = this.state.tasks;
    let taskElements = [];

    if (this.state.loaded) {
      taskElements = tasks.map((task) => (
        <TaskListItem key={task.id}
                      task={task}
                      projectId={projectId}
                      updateTask={updateTask}
        />
      ));
      return (
        <div className="task-list-view">
          <TaskListHeader addNewTask={this.addNewTask}/>
          <ul>
            {taskElements}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskListView));
