import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { fetchProjects } from '../actions/project_actions';
import { fetchTeams } from '../actions/team_actions';
import { closeSidebar } from '../actions/ui_actions';

import TeamSection from './widgets/team_section';

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
  }
);

class SideBar extends React.Component {
  componentDidMount() {
    this.props.fetchTeams();
    // this.props.fetchProjects();
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
        <h1><Link to="/">duabl</Link></h1>
        <ul className="team-list">
          {teamSections}
        </ul>
      </div>
    ) : (
      null
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
