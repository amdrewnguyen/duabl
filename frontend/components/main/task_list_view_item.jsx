import React from 'react';
import { Link } from 'react-router-dom';

class TaskListItem extends React.Component {

  render() {
    const {task, projectId} = this.props;
    return (
      <li className="task-list-item">
        <Link to={`/${projectId}/${task.id}`}>
          {task.name}
        </Link>
      </li>
    );
  }
}

export default TaskListItem;
