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
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    fetchProjectTasks: (projectId) => dispatch(fetchProjectTasks()),
  }
);

class TaskListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
  }

  componentDidMount() {
    this.props.fetchProjectTasks(this.props.match.projectId).then(
      () => this.setState({loaded: true})
    );
  }

  render() {
    let taskElements = [];

    if (this.state.loaded) {
      this.props.tasks.map((task) => (
        <li key={task.id}>
          {task.name}
        </li>
      ));
    }
    return (
      <div className="task-list-view">
        Project id: {this.props.match.params.projectId}
        <ul>
          {taskElements}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListView);
