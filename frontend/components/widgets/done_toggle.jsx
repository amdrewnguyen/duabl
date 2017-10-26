import React from 'react';
import { connect } from 'react-redux';

class DoneToggle extends React.Component {
  render() {
    return (
      <a className="done-toggle" completed={`${this.props.task.completed}`}>
        <i className="fa fa-check-circle-o" aria-hidden="true"></i>
      </a>
    );
  }
}

export default DoneToggle;
