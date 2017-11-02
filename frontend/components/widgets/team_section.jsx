import React from 'react';
import {connect} from 'react-redux';

import MembersSection from './members_section';
import ProjectsSection from './projects_section';
import FontAwesome from 'react-fontawesome';
import NewProjectForm from '../projects/project_form_container';
import { openModal } from '../../actions/ui_actions';
import TeamDropdown from './team_dropdown';


const mapStateToProps = (state, ownProps) => {
  if (state.entities.teams[ownProps.teamId]) {
    return {
      team: state.entities.teams[ownProps.teamId],
      members: state.entities.teams[ownProps.teamId].memberIds.map((memberId) => state.entities.users[memberId]),
      projects: state.entities.teams[ownProps.teamId].projectIds.map((projectId) => state.entities.projects[projectId]),
      selectedProjId: state.ui.projectId,
    };
  } else {
    return {
      team: null,
      members: [],
      // projects: [],
    };
  }
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
    this.state = {expanded: startExpanded, members: this.props.members, projects: this.props.projects};
    let startExpanded = this.state.projects.some((project) => project.id === this.props.selectedProjId);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.checkExpanded = this.checkExpanded.bind(this);
  }

  checkExpanded() {
    if(this.state.projects.some((project) => (project && (project.id === this.props.selectedProjId)))) {
      this.setState({expanded: true});
    }
  }

  componentDidMount() {
    this.checkExpanded();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.members.length !== this.props.members.length) {
      this.setState({members: newProps.members});
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
              {this.props.team ? this.props.team.name : ""}
            </h3>
            <TeamDropdown team={this.props.team} />
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
                                 teamId={this.props.team.id}
                                 team={this.props.team}/>
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
