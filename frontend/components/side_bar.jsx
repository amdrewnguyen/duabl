import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { fetchProjects } from '../actions/project_actions';
import { fetchTeams } from '../actions/team_actions';
import NewProjectForm from './projects/project_form_container';
import { openModal } from '../actions/ui_actions';
import TeamSection from './widgets/team_section';

const mapStateToProps = (state) => (
  {
    projects: Object.values(state.entities.projects.items),
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser,
    selectedProjId: state.ui.projectId,
    teams: Object.values(state.entities.teams),
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchProjects: () => dispatch(fetchProjects()),
    fetchTeams: () => dispatch(fetchTeams()),
    openCreateProjectModal:
      () => dispatch(
        openModal(NewProjectForm, {formType: "Create"})
      ),
    openEditModal: (projectId) => dispatch(openModal(NewProjectForm, {formType: "Update", projectId})),
  }
);

class SideBar extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
    this.props.fetchTeams();
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.currentUser && newProps.currentUser) {
      this.props.fetchProjects();
    }
  }

  handleClick(projectId) {
    return (e) => {
      this.props.history.push(`/${projectId}/list`);
    };
  }

  render() {
    const { projects, loggedIn, selectedProjId } = this.props;
    const projectElems = projects.map(
      (project) => (
        <li onClick={this.handleClick(project.id)} key={project.id} className={parseInt(selectedProjId) === project.id ? "selected-proj" : "not-selected-proj"}>
          <Link to={`/${project.id}/list`}>{project.name}</Link>
          <FontAwesome onClick={() => {
              this.props.openEditModal(project.id);
            }} name="pencil" aria-hidden="true" />
        </li>
      )
    );
    return loggedIn ? (
      <div className="side-bar">
        <h1><Link to="/">duabl</Link></h1>
        <ul className="project-list">
          <li key={-1}>
            PROJECTS
            <a onClick={this.props.openCreateProjectModal}>( + )</a>
          </li>
          {projectElems}
        </ul>
        <TeamSection teamId={1}/>
      </div>
    ) : (
      <div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
