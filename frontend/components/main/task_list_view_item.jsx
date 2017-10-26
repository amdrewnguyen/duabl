import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import DoneToggle from '../widgets/done_toggle';

class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.task);
    this.saveTimerId = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.task);
  }

  handleClick(e) {
    const { history, projectId, task } = this.props;
    history.push(`/${projectId}/${task.id}`);
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
    const { projectId } = this.props;
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

export default withRouter(TaskListItem);
