import React from 'react';
import ProfileImage from './profile_image';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

class ProjectsSection extends React.Component {
  render() {
    const userElements = this.props.members.map((member) =>
      (
        <li key={member.id}>
          <ProfileImage user={member} onClick={(e)=>{}} size={24} />
        </li>
      )
    );
    return (
      <div className="members-section">
        <ul className="member-pics">
          {userElements}
        </ul>
        <div className="add-team-member-btn">+</div>
      </div>
    );
  }
}

export default ProjectsSection;
