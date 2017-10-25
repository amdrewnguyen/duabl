import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchProjectTasks } from '../../actions/task_actions';

const mapStateToProps = (state, ownProps) => {

  let project = state.entities.projects[ownProps.match.params.projectId];
  console.log(project);
  let tasks = [];
  if (project && state.entities.tasks) {

    tasks = project.taskIds
              .map((taskId) => (state.entities.tasks[taskId]));
  }
  return {
    tasks,
    projectId: ownProps.match.params.projectId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    fetchProjectTasks: (projectId) => dispatch(fetchProjectTasks(projectId)),
  }
);

class TaskListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
  }

  componentDidMount() {
    console.log("Project ID is: " + this.props.projectId);
    
    this.props.fetchProjectTasks(this.props.projectId).then(
      () => this.setState({loaded: true})
    );
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.projectId !== this.props.match.params.projectId) {
      this.setState({loaded: false});
      this.props.fetchProjectTasks(newProps.match.params.projectId).then(
        () => this.setState({loaded: true})
      );
    }
  }

  render() {
    let taskElements = [];

    if (this.state.loaded) {
      taskElements = this.props.tasks.map((task) => (
        <li key={task.id}>
          {task.name}
        </li>
      ));
    }
    return (
      <div className="task-list-view">
        <ul>
          {taskElements}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListView);
