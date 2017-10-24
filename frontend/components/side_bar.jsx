import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchProjects } from '../actions/project_actions';
import NewProjectForm from './projects/project_form_container';
import { openModal } from '../actions/ui_actions';

const mapStateToProps = (state) => (
  {
    projects: Object.values(state.entities.projects),
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchProjects: () => dispatch(fetchProjects()),
    openCreateProjectModal:
      () => dispatch(
        openModal(NewProjectForm, {formType: "Create"})
      ),
  }
);

class SideBar extends React.Component {
  componentDidMount() {
    console.log("I've mounted.");
    this.props.fetchProjects();
  }

  render() {
    const { projects, loggedIn } = this.props;
    const projectElems = projects.map(
      (project) => (
        <li key={project.id}>
          <Link to={`/${project.id}/list`}>{project.name}</Link>
        </li>
      )
    );
    return loggedIn ? (
      <div className="side-bar">
        <h1>duabl</h1>
        <ul className="project-list">
          <li key={-1}>
            PROJECTS
            <a onClick={this.props.openCreateProjectModal}>+</a>
          </li>
          {projectElems}
        </ul>
      </div>
    ) : (
      <div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
