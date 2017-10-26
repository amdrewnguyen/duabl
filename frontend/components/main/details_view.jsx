import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchTask, updateTask } from '../../actions/task_actions';
import DetailsHeader from './details_view_header';

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
    this.state = { loaded: false };
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
    if (newProps.taskId !== this.props.taskId) {
      this.setState({loaded: false});
      this.props.fetchTask(newProps.taskId)
        .then(
          () => this.setState({loaded: true})
        );
    }
  }

  render() {
    return (
        this.props.show ? (
          <div className="details-view">
            <DetailsHeader task={this.props.task} updateTask={this.props.updateTask}/>
            {
              this.state.loaded ? (
                this.props.task.id + "\n" +
                this.props.task.name
              ) : (
                null
              )
            }
          </div>
        ) : (
          null
        )
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsView);
