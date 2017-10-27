import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Route } from 'react-router-dom';

import PageHeader from './page_header';
import TaskListView from './task_list_view';
import DetailsView from './details_view';
import { updateTask } from '../../actions/task_actions';
import { receivePath } from '../../actions/ui_actions';


const mapStateToProps = (state, ownProps) => {
  const projectId = ownProps.match.params.projectId;
  const taskId = ownProps.match.params.taskId;
  return {
    project: state.entities.projects.items[projectId],
    projectId,
    taskId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    receivePath: (params) => dispatch(receivePath(params)),
  }
);

class MainView extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    console.log(this.props.match.params);

    this.props.receivePath(this.props.match.params);

  }


  componentWillReceiveProps(newProps) {
    if (this.props.match.params.projectId !== newProps.match.params.projectId ||
      this.props.match.params.taskId !== newProps.match.params.taskId) {
        console.log(newProps.match.params);
        this.props.receivePath(newProps.match.params);
      }
  }

  render() {
    const { projectId, taskId, project } = this.props;

    return (
      <div className="main-view">
        <PageHeader project={project} />
        <TaskListView />
        {
          taskId !== "list" ? (
            <DetailsView />
          ) : (
            null
          )
        }
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainView)
);
