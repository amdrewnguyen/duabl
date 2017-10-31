import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import DoneToggle from '../widgets/done_toggle';
import {connect} from 'react-redux';

import { receivePath } from '../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receivePath: (params) => dispatch(receivePath(params)),
  };
};

class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.task);
    this.saveTimerId = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(this.props.task.id !== newProps.task.id) {
      this.setState(newProps.task);
    }
  }

  handleClick(e) {
    const { projectId, task } = this.props;
    this.props.history.push(`/${projectId}/${task.id}`);
  }

  handleChange(e) {
    this.setState({name: e.currentTarget.value});
    if (this.saveTimerId) clearTimeout(this.saveTimerId);

    this.saveTimerId = setTimeout(
      () => {
        this.props.updateTask(this.state);
        this.saveTimerId = null;
      },
      1500
    );
  }

  render() {
    let { projectId } = this.props;
    const task = this.state;
    return (
      <li className="task-list-item" onClick={this.handleClick}>
        <DoneToggle task={this.props.task} updateTask={this.props.updateTask} />
        <textarea
          value={task.name}
          rows="1"
          onChange={this.handleChange}
        />
      </li>
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(TaskListItem));
