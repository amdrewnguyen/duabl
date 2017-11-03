import React from 'react';
import ProfileImage from './profile_image';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

class ProjectsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {members: this.props.members, idSet: new Set(this.props.members.map(u=>u.id))};

  }

  componentDidMount() {
    this.setState({members: this.props.members, idSet: new Set(this.props.members.map(u=>u.id))});
  }

  componentWillReceiveProps(newProps) {
    const newIdSet = new Set(newProps.members.map(u=>u.id));
    if ( newIdSet !== this.state.idSet) {
      this.setState({members: newProps.members, idSet: newIdSet});
    }
  }

  render() {
    const userElements = this.state.members.map((member) =>
      (
        <li key={member.id}>
          <ProfileImage user={member} onClick={(e)=>{}} size={24} />
        </li>
      )
    );
    return (
      <div className="members-section">
        <ul className="member-pics">
          {userElements.slice(0,6)}
        </ul>
        <div className="add-team-member-btn">+</div>
      </div>
    );
  }
}

export default ProjectsSection;
