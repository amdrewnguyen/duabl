import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Route } from 'react-router-dom';

import TaskListView from './task_list_view';
import DetailsView from './details_view';
import { updateTask } from '../../actions/task_actions';

const mapStateToProps = (state, ownProps) => (
  {

  }
);

const mapDispatchToProps = (dispatch, ownProps) => (
  {
  }
);

class MainView extends React.Component {


  render() {
    return (
      <div className="main-view">
        <Route path="/:projectId" component={TaskListView} />
        <Route path="/:projectId/:taskId" component={DetailsView} />
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
