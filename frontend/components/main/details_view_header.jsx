import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';


class DetailsHeader extends React.Component {

  onClose(e) {
    const projectId = this.props.match.params.projectId;
    this.props.history.push(`/${projectId}/list`);
  }

  createSubtask(e) {
    const newSubtask = {
      project_id: this.props.match.params.projectId,
      parent_id: this.props.match.params.taskId,
      name: "",
    };
    this.props.createTask(newSubtask);
  }

  handleDeleteTask(e) {
    this.props.deleteTask(this.props.task.id)
      .then(
        () => this.props.history.push(`/${this.props.match.params.projectId}/list`)
    );
  }

  render() {
    return (
      <div className="task-buttons">
        <div className="assign-btn">
          <div className="user-icon"><FontAwesome name="user-o" aria-hidden="true"/></div><p>Unassigned</p>
        </div>
        <div className="due-date-btn">
          <div className="due-date-icon"><FontAwesome name="calendar" aria-hidden="true" /></div><p>Due Date</p>
        </div>
        <ul>
          <li onClick={this.createSubtask.bind(this)}><FontAwesome name="list" aria-hidden="true" /></li>
          <li onClick={this.handleDeleteTask.bind(this)}><FontAwesome name="trash" aria-hidden="true" /></li>
          <li>AN</li>
        </ul>
        <FontAwesome onClick={this.onClose.bind(this)} name="times" aria-hidden="true" />
      </div>
    );
  }
}

export default withRouter(DetailsHeader);
