import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchProjectTasks,
         updateTask,
         createTask } from '../../actions/task_actions';
import { fetchProject } from '../../actions/project_actions';
import TaskListHeader from './task_list_view_header';
import TaskListItem from './task_list_view_item';

const mapStateToProps = (state, ownProps) => {
  let project = state.entities.projects.items[ownProps.match.params.projectId];
  // console.log(project);
  let tasks = [];
  if (project && state.entities.tasks) {
    tasks = project.taskIds.filter((id) => (!state.entities.tasks[id].parent_id)).map(
      (taskId) => {
        return state.entities.tasks[taskId];
      }
    );
  }
  return {
    tasks,
    projectId: ownProps.match.params.projectId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    fetchProjectTasks: (projectId) => dispatch(fetchProjectTasks(projectId)),
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
    updateTask: (task) => dispatch(updateTask(task)),
    createTask: (task) => dispatch(createTask(task)),
  }
);

class TaskListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
    this.addNewTask = this.addNewTask.bind(this);
  }

  componentDidMount() {
    // console.log("Project ID is: " + this.props.projectId);
    if(!this.props.project) {
      this.props.fetchProject(this.props.projectId)
        .then(
          () => {
            if (this.props.projectId !== "list") {
              this.props.fetchProjectTasks(this.props.projectId)
                .then(
                  () => this.setState({loaded: true})
                );
              }
            }
        );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.projectId !== this.props.match.params.projectId) {
      this.setState({loaded: false});
      this.props.fetchProjectTasks(newProps.match.params.projectId).then(
        () => this.setState({loaded: true})
      );
    }
  }

  // TODO: a function that adds a task to the component that creates a
  //       new task on the back end.
  addNewTask() {
    const newBlankTask = {name: "", project_id: this.props.projectId};
    this.props.createTask(newBlankTask);
  }

  render() {
    const { tasks, projectId, history, updateTask } = this.props;
    let taskElements = [];

    if (this.state.loaded) {
      taskElements = tasks.map((task) => (
        <TaskListItem key={task.id}
                      task={task}
                      projectId={projectId}
                      updateTask={updateTask}
        />
      ));
    }
    return (
      <div className="task-list-view">
        <TaskListHeader addNewTask={this.addNewTask}/>
        <ul>
          {taskElements}
        </ul>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskListView));
