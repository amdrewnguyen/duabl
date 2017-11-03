import React from 'react';
import {connect} from 'react-redux';

import MembersSection from './members_section';
import ProjectsSection from './projects_section';
import FontAwesome from 'react-fontawesome';
import NewProjectForm from '../projects/project_form_container';
import { openModal } from '../../actions/ui_actions';
import TeamDropdown from './team_dropdown';


const mapStateToProps = (state, ownProps) => {
  // if (state.entities.teams[ownProps.teamId]) {
    return {
      team: state.entities.teams[ownProps.teamId],
      members: state.entities.teams[ownProps.teamId].memberIds.map((memberId) => state.entities.users[memberId]),
      projects: state.entities.teams[ownProps.teamId].projectIds.map((projectId) => state.entities.projects[projectId]),
      selectedProjId: state.ui.projectId,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openCreateProjectModal:
      () => dispatch(
        openModal(NewProjectForm, {formType: "Create", teamId: ownProps.teamId})
      ),
    openEditModal: (projectId) => dispatch(openModal(NewProjectForm, {formType: "Update", projectId})),

  };
};

class TeamSection extends React.Component {
  constructor(props) {
    super(props);
    let startExpanded = this.props.projects.some((project) => project.id === this.props.selectedProjId);
    this.state = {expanded: false, members: this.props.members, idSet: new Set(this.props.members.map(u=>u.id)), projects: this.props.projects};
    this.toggleDetails = this.toggleDetails.bind(this);
    this.checkExpanded = this.checkExpanded.bind(this);
  }

  checkExpanded() {
    if(this.state.projects.some((project) => (project && (project.id == this.props.selectedProjId)))) {
      console.log("expand!");
      this.setState({expanded: true});
    }
  }

  componentDidMount() {
    this.setState({team: this.props.team,
                   members: this.props.members,
                   projects: this.props.projects,
                   idSet: new Set(this.props.members.map(u=>u.id))}
                 );
    this.checkExpanded();
  }

  componentWillReceiveProps(newProps) {
    const newIdSet = new Set(newProps.members.map(u=>u.id));
    if ( newIdSet !== this.state.idSet) {
      this.setState({team: newProps.team, members: newProps.members, idSet: newIdSet});
    }
    if (newProps.projects !== this.props.projects) {
      this.setState({projects: newProps.projects});
      this.checkExpanded();
    }
  }

  toggleDetails(e) {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
      return (
        <div className="team-section">
          <div className="team-section-header">
            <h3 onClick={this.toggleDetails}>
              <FontAwesome name={this.state.expanded ? "caret-down" : "caret-right"} aria-hidden="true"/>
              {this.state.team ? this.state.team.name : ""}
            </h3>
            <TeamDropdown team={this.state.team} />
          </div>
          {
            this.state.expanded ? (
              <div className="team-details">
                <MembersSection members={this.state.members} />
                <ProjectsSection openCreateProjectModal={this.props.openCreateProjectModal}
                                 projects={this.state.projects}
                                 openEditModal={this.props.openEditModal}
                                 loggedIn={this.props.loggedIn}
                                 selectedProjId={this.props.selectedProjId}
                                 teamId={this.state.team.id}
                                 team={this.state.team}/>
              </div>
            ) : (
              null
            )
          }
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSection);
