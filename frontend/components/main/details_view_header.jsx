import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';

import Assigner from '../widgets/assigner/assigner';
import DatePicker from '../widgets/date_picker/date_picker';

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
        <Assigner task={this.props.task} />
        <DatePicker task={this.props.task} />
        <ul>
          <li onClick={this.createSubtask.bind(this)}><FontAwesome name="list" aria-hidden="true" /></li>
          <li onClick={() => this.props.deleteTask()}><FontAwesome name="trash" aria-hidden="true" /></li>
        </ul>
        <FontAwesome onClick={this.onClose.bind(this)} name="times" aria-hidden="true" />
      </div>
    );
  }
}

export default withRouter(DetailsHeader);
