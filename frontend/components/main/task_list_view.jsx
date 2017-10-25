import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchProjectTasks } from '../../actions/task_actions';

const mapStateToProps = (state, ownProps) => (
  {
    tasks: state.entities.projects[ownProps.match.params.projectId].taskIds
            .map((taskId) => (state.entities.taks[taskId])),
  }
);

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    fetchProjectTasks: (projectId) => dispatch(fetchProjectTasks()),
  }
);

class TaskListView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="task-list-view">
        Project id: {this.props.match.params.projectId}
      </div>
    );
  }
}

export default TaskListView;
