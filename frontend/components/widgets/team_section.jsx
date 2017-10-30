import React from 'react';

import MembersSection from './members_section';
import ProjectsSection from './projects_section';

class TeamSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {expanded: false};
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  toggleDetails(e) {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    return (
      <li>
        <h3 onClick={this.toggleDetails}>{this.props.team.name}</h3>
        {
          this.state.expanded ? (
            <div className="team-details">
              <MembersSection teamId={this.props.teamId} />
              <ProjectsSection teamId={this.props.teamId} />
            </div>
          ) : (
            null
          )
        }
      </li>
    );
  }
}

export default TeamSection;
