import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.task);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { history, projectId, task } = this.props;
    history.push(`/${projectId}/${task.id}`);
  }

  handleChange(e) {
    this.setState({name: e.currentTarget.value});
  }

  render() {
    const {task, projectId} = this.props;
    return (
      <li className="task-list-item" onClick={this.handleClick}>
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
