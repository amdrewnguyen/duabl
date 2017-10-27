import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchTask, updateTask } from '../../actions/task_actions';
import DetailsHeader from './details_view_header';
import DoneToggle from '../widgets/done_toggle';


const mapStateToProps = (state, ownProps) => {
  let task = null;
  const taskId = ownProps.match.params.taskId;

  if (taskId === 'list') {
    return { task, taskId, show: false};
  } else {
    task = state.entities.tasks[taskId];
    return { task, taskId, show: (task ? true : false) };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    fetchTask: (taskId) => dispatch(fetchTask(taskId)),
    updateTask: (task) => dispatch(updateTask(task)),
  }
);

class DetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, task: this.props.task };
    this.saveTimerId = null;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.task && this.props.taskId !== 'list') {
      this.props.fetchTask(this.props.taskId)
        .then(
          () => this.setState({loaded: true})
        );
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({task: newProps.task});
    if (newProps.taskId !== this.props.taskId) {
      this.setState({loaded: false});
      this.props.fetchTask(newProps.taskId)
        .then(
          () => this.setState({loaded: true})
        );
    }
  }

  handleChange(e) {
    const newTask = Object.assign({}, this.state.task, {name: e.currentTarget.value});
    this.setState({ task: newTask });
    if (this.saveTimerId) clearTimeout(this.saveTimerId);

    this.saveTimerId = setTimeout(
      () => {
        this.props.updateTask(this.state.task);
        this.saveTimerId = null;
      },
      1500
    );
  }

  render() {
    return (
        this.props.show ? (
          <div className="details-view">
            <DetailsHeader task={this.props.task} updateTask={this.props.updateTask}/>
            <div className="details-name">
              <DoneToggle task={this.props.task} updateTask={this.props.updateTask}/>
                <textarea
                  value={this.state.task.name}
                  onChange={this.handleChange}
                />
            </div>
            <textarea className="details-description"
                      value={this.props.task.description}
                      placeholder="Description"/>
          </div>
        ) : (
          null
        )
      );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsView));
