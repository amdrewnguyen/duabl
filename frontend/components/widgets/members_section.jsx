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
          <ProfileImage user={member} onClick={(e)=>{}} />
        </li>
      )
    );
    return (
      <ul className="member-pics">
        {userElements}
        <li key={-1}>
          <div className="profile-image">+</div>
        </li>
      </ul>
    );
  }
}

export default ProjectsSection;
