import React from 'react';
import {connect} from 'react-redux';

import MembersSection from './members_section';
import ProjectsSection from './projects_section';
import FontAwesome from 'react-fontawesome';

const mapStateToProps = (state, ownProps) => {
  if (state.entities.teams[ownProps.teamId]) {
    return {
      team: state.entities.teams[ownProps.teamId],
      members: state.entities.teams[ownProps.teamId].memberIds.map((memberId) => state.entities.users[memberId]),
      // projects: state.entities.teams[ownProps.teamId].memberIds.map((memberId) => state.entities.users[memberId]),
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

  };
};

class TeamSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {expanded: false, members: []};
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.members.length !== this.props.members.length) {
      this.setState({members: newProps.members});
    }
    // if (newProps.projects.length !== this.props.projects.length) {
    //   this.setState({projects: newProps.projects});
    // }
  }

  toggleDetails(e) {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
      return (
        <div className="team-section">

          <h3 onClick={this.toggleDetails}>
            <FontAwesome name={this.state.expanded ? "caret-down" : "caret-right"} aria-hidden="true"/>
            {this.props.team ? this.props.team.name : ""}
          </h3>
          {
            this.state.expanded ? (
              <div className="team-details">
                <MembersSection members={this.state.members} />
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
