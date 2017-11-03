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
    this.updateName = this.updateName.bind(this);
    if (!isNaN(parseInt(props.task.id))) {
      this.props.registerItemCallback(
        parseInt(props.task.id),
        (val) => { this.updateName(val); }
      );
    }
  }

  componentDidMount() {
    if (this.props.sendItemUpdateCallback) {
      this.setState({sendItemUpdateCallback: this.props.sendItemUpdateCallback});
    }

    if (!isNaN(parseInt(this.props.task.id))) {
      this.props.registerItemCallback(parseInt(this.props.task.id), this.updateName);
    }
  }

  componentWillReceiveProps(newProps) {
    if(this.props.task !== newProps.task) {
      this.setState(newProps.task);
    }

    if ((newProps.task.id !== this.props.task.id) && (!isNaN(parseInt(newProps.task.id)))) {
      this.props.registerItemCallback(
        parseInt(newProps.task.id),
        (val) => { this.updateName(val); }
      );
    }
  }

  componentWillUnmount() {
  }

  handleClick(e) {
    const { projectId, task } = this.props;
    const taskPath = `/${projectId}/${task.id}`;
    if (this.props.history.location.pathname !== taskPath) {
      this.props.history.push(taskPath);
    }
  }

  handleChange(e) {
    this.setState({name: e.currentTarget.value});
    this.props.updateDetailsName(e.currentTarget.value);
    if (this.saveTimerId) clearTimeout(this.saveTimerId);

    this.saveTimerId = setTimeout(
      () => {
        this.props.updateTask(this.state);
        this.saveTimerId = null;
      },
      1000
    );
  }

  updateName(value) {
    this.setState({name: value});
  }


  render() {
    let { projectId, selected } = this.props;
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
