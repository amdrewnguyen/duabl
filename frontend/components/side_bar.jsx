import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { fetchProjects } from '../actions/project_actions';
import { fetchTeams } from '../actions/team_actions';
import { openModal, closeSidebar } from '../actions/ui_actions';

import TeamSection from './widgets/team_section';
import NewTeamForm from './teams/new_team_form';

const mapStateToProps = (state) => (
  {
    projects: Object.values(state.entities.projects.items),
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser,
    teams: Object.values(state.entities.teams),
    sidebarOpen: state.ui.sidebarOpen,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchProjects: () => dispatch(fetchProjects()),
    fetchTeams: () => dispatch(fetchTeams()),
    closeSidebar: () => dispatch(closeSidebar()),
    openNewTeamModal: () => dispatch(openModal(NewTeamForm))
  }
);

class SideBar extends React.Component {
  componentDidMount() {
    this.props.fetchTeams();
    // this.props.fetchProjects();
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.currentUser && newProps.currentUser) {
      this.props.fetchTeams();
      this.props.fetchProjects();
    }
  }

  handleClick(projectId) {
    return (e) => {
      const projectPath = `/${projectId}/list`;
      if (this.props.history.location.pathname !== projectPath) {
        this.props.history.push(projectPath);
      }
    };
  }

  render() {
    const { projects, teams, loggedIn, selectedProjId, sidebarOpen } = this.props;

    const teamSections = teams.map(
      (team) => (
        <TeamSection key={team.id}
                     teamId={team.id}
                     loggedIn={loggedIn}/>
      )
    );
    return loggedIn ? (
      <div className="side-bar">
        <FontAwesome name="times close-button"
                     aria-hidden="true"
                     onClick={() => this.props.closeSidebar()} />
        <h1><Link to="/"><FontAwesome name="list-alt" aria-hidden="true" /> duabl</Link></h1>
        <ul className="team-list">
          {teamSections}
        </ul>
        <div className="add-team-btn-row">
          <button className="add-team-btn"
                  onClick={
                    () => {
                      this.props.openNewTeamModal();
                    }
                  }>Create New Team</button>
        </div>
      </div>
    ) : (
      null
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
