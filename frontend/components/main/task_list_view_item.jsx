import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import DoneToggle from '../widgets/done_toggle';
import {connect} from 'react-redux';

import { receivePath, selectTask, updateSelectedTask } from '../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  return {

    selectedTaskId: state.ui.selectedTaskId,
    selectedTaskName: state.ui.selectedTaskName,
    selectedTask: state.ui.selectedTask,
    selected: Boolean(ownProps.task.id === state.ui.selectedTaskId),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receivePath: (params) => dispatch(receivePath(params)),
    selectTask: (task) => dispatch(selectTask(task)),
    updateSelectedTask: (value) => dispatch(updateSelectedTask(value)),
  };
};

class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.task);
    this.saveTimerId = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeLinked = this.handleChangeLinked.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
    if(this.props.task.id !== newProps.task.id) {
      this.setState(newProps.task);
    }
  }

  handleClick(e) {
    const { projectId, task } = this.props;
    this.props.selectTask(task);
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

  handleChangeLinked(e) {
    this.props.updateSelectedTask(e.currentTarget.value);
    if (this.saveTimerId) clearTimeout(this.saveTimerId);

    this.saveTimerId = setTimeout(
      () => {
        this.props.updateTask(Object.assign({}, this.state, {name: this.state.selectedTaskName}));
        this.saveTimerId = null;
      },
      1500
    );
  }

  render() {
    let { projectId, selected } = this.props;
    const task = this.state;
    return (
      <li className="task-list-item" onClick={this.handleClick}>
        <DoneToggle task={this.props.task} updateTask={this.props.updateTask} />
        <textarea
          value={ task.name}
          rows="1"
          onChange={ this.handleChange}
        />
      </li>
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(TaskListItem));
