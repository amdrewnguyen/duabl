import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import DoneToggle from '../widgets/done_toggle';
import FontAwesome from 'react-fontawesome';

class SubtaskListItem extends React.Component {
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
      <li className="task-list-item">
        <DoneToggle task={this.props.task} updateTask={this.props.updateTask} />
        <textarea
          value={task.name}
          rows="1"
          onChange={this.handleChange}
        />
        <Link to={`/${projectId}/${task.id}`}>
          <span>
            <FontAwesome name="comment-o" aria-hidden="true" />
          </span>
        </Link>
      </li>
    );
  }
}

export default withRouter(SubtaskListItem);
