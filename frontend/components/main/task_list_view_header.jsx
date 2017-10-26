import React from 'react';

class TaskListHeader extends React.Component {
  render() {
    return (
      <div className="task-list-header">
        <button onClick={this.props.addNewTask}>Add Task</button>
      </div>
    );
  }
}

export default TaskListHeader;
