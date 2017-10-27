import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';


class DetailsHeader extends React.Component {

  onClose(e) {
    const projectId = this.props.match.params.projectId;
    this.props.history.push(`/${projectId}/list`);
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
          <li><FontAwesome name="list" aria-hidden="true" /></li>
          <li><FontAwesome name="trash" aria-hidden="true" /></li>
          <li>AN</li>
        </ul>
        <FontAwesome onClick={this.onClose.bind(this)} name="times" aria-hidden="true" />
      </div>
    );
  }
}

export default withRouter(DetailsHeader);
