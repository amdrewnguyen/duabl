import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';


import { updateTask } from '../../../task_actions';

// has taskId, updateTask, 230px x 320px

const mapStateToProps = (state, ownProps) => {
  return {

  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateTask: (task) => dispatch(updateTask(task)),
  };
};

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      dueOn: this.props.task.dueOn,
    };
  }

  render() {
    return (
      <div className="due-date-btn">
        <div className="due-date-icon">
          <FontAwesome name="calendar" aria-hidden="true" />
        </div>
        <p>Due Date</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
