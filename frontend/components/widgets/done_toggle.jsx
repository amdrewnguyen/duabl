import React from 'react';
import { connect } from 'react-redux';
import merge from 'lodash/merge';
import FontAwesome from 'react-fontawesome';

class DoneToggle extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.updateTask(
      Object.assign(
        {},
        this.props.task,
        {completed: !this.props.task.completed}
      )
    );
  }

  render() {
    return (
      <div onClick={this.handleClick} className={this.props.task.completed ? "toggle-done" : "toggle-not-done"}>
        <FontAwesome name="check" aria-hidden="true"/>
      </div>
    );
  }
}

export default DoneToggle;
