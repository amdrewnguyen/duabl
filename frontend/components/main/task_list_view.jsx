import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class TaskListView extends React.Component {
  constructor(props) {
    super(props);
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
