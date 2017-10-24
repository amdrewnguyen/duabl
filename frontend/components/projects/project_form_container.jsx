import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { creaeteProject,
         updateProject,
         fetchProject } from '../../actions/project_actions';
import ProjectForm from './project_form';

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.location.pathname;
  let formTitle, otherTitle, otherPath;
  if (path === "/login") {
    [formTitle, otherTitle, otherPath] = ["Log In", "Sign Up", "/signup"];
  } else {
    [formTitle, otherTitle, otherPath] = ["Sign Up", "Log In", "/login"];
  }
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors.session,
    path,
    formTitle,
    otherTitle,
    otherPath,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const action = (ownProps.location.pathname === "/login") ? login : signup;
  return {
    action: (user) => dispatch(action(user)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectForm)
);
