import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createProject,
         updateProject,
         fetchProject } from '../../actions/project_actions';

import ProjectForm from './project_form';

const mapStateToProps = (state, ownProps) => {
  return ownProps.formType === "Update" ? (
    {
      project: state.entities.projects[ownProps.projectId],
    }
  ) : (
    {

    }
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const action = ownProps.formType === "Update" ? updateProject : createProject;
  return {
    action: (user) => dispatch(action(user)),
    fetchProject: (projectId) => dispatch(fetchProject(projectId)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectForm)
);
