import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.task);
    this.saveTimerId = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.dbSync = this.dbSync.bind(this);
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
        console.log(this.state);
        this.props.updateTask(this.state);
        this.saveTimerId = null;
      },
      1000
    );
  }

  dbSync() {

  }

  render() {
    const { projectId } = this.props;
    const task = this.state;
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
