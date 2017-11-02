import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchProjectTasks,
         updateTask,
         createTask } from '../../actions/task_actions';
import { fetchProject } from '../../actions/project_actions';
import TaskListHeader from './task_list_view_header';
import TaskListItem from './task_list_view_item';
import ListButton from './list_button';
import { receivePath } from '../../actions/ui_actions';
import { getProjectTasks } from '../../util/selectors';


const mapStateToProps = (state, ownProps) => {
  const { projectId, taskId } = ownProps.match.params;
  const stateProjects = state.entities.projects.items;
  const stateTasks = state.entities.tasks;
  let project = state.entities.projects.items[projectId];
  let tasks = getProjectTasks(stateProjects, stateTasks, projectId);

  return {
    project,
    tasks,
    projectId,
    taskId,
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
    this.state = {
      tasks: props.tasks,
      loaded: (props.project && props.tasks),
      project: props.project,
      callbacks: {},
    };
    this.addNewTask = this.addNewTask.bind(this);
    props.sendUpdateTaskListName(this.updateItemName.bind(this));

  }

  componentDidMount() {
    // console.log("Project ID is: " + this.props.projectId);
    this.props.sendUpdateTaskListName(this.updateItemName.bind(this));

    if(!this.props.project) {
      this.props.fetchProject(this.props.projectId)
        .then(
          () => {
            this.setState({ project: this.props.project });

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
      this.props.fetchProject(newProps.projectId)
        .then(
          () => {
            this.props.fetchProjectTasks(this.props.projectId)
              .then(
                () => {
                  this.setState({
                    project: this.props.project,
                    tasks: this.props.tasks,
                    loaded: true
                  });
                }
              );
          }
        );
    }
    if (newProps.tasks.length !== this.props.tasks.length) {
      this.setState({tasks: newProps.tasks});
    }
  }

  addNewTask() {
    const newBlankTask = {name: "", project_id: this.props.projectId};
    this.props.createTask(newBlankTask);
  }

  updateItemName(key, value) {
    this.state.callbacks[parseInt(key)](value);
  }

  registerItemCallback(key, cb) {
    const callbacks = this.state.callbacks;
    callbacks[key] = cb;
    this.setState({callbacks,});
  }

  render() {
    const { projectId, updateTask } = this.props;
    let { project, tasks, loaded } = this.state;
    let taskElements = null;
    if (this.state.tasks) {
      taskElements = tasks.map(
        (task) => {
          return (
            <TaskListItem key={task.id}
                        task={task}
                        projectId={projectId}
                        updateTask={updateTask}
                        updateDetailsName={this.props.updateDetailsName}
                        registerItemCallback={(key, cb) => this.registerItemCallback(key, cb)}
            />
          );
        }
      );
    }
    return (
      <div className="task-list-view">
        <TaskListHeader addNewTask={this.addNewTask}/>
        <ul>
          {taskElements}
        </ul>
        <ListButton action={this.addNewTask} numTasks={this.state.tasks.length} />
      </div>
    );

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskListView));
