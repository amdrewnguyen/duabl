import React from 'react';
import { connect } from 'react-redux';
import merge from 'lodash/merge';

class DoneToggle extends React.Component {


  onChange(e) {
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
      <input type="checkbox" onChange={this.onChange.bind(this)} className="done-toggle" checked={this.props.task.completed}/>
    );
  }
}

export default DoneToggle;
