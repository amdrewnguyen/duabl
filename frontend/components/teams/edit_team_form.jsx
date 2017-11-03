import React from 'react';
import { connect } from 'react-redux';

import { updateTeam } from '../../actions/team_actions';
import UsersSelector from '../widgets/users_selector';

const mapStateToProps = (state, ownProps) => {
  return {
    team: ownProps.team,
    name: ownProps.team.name,
    errors: state.errors.team,
    selectedUsers: ownProps.team.memberIds.map((id) => state.entities.users[id]),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateTeam: (team) => dispatch(updateTeam(team)),
  };
};

class EditTeamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: props.team.name, memberIds: props.team.memberIds, getSelectedUserIds: null};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  sendGetSelected(cb) {
    this.setState({getSelectedUserIds: cb});
  }


  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const newTeam = {
      id: this.props.team.id,
      name: this.state.name,
    };
    let memberIds = this.state.getSelectedUserIds();
    this.props.updateTeam({team: newTeam, memberIds})
      .then(
        () => this.props.closeModal(),
        () => console.log("error")
      );
  }

  render() {
    return (
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Team</h2>
        <form className="new-team-form" onSubmit={this.handleSubmit}>
          <label>TEAM NAME</label><br></br>
          <input type="text" value={this.state.name}
                 onChange={this.update("name")}/>
          <br></br>
          <label>MEMBERS</label><br></br>
          <UsersSelector selectedUsers={this.props.selectedUsers} sendGetSelected={(cb) => this.sendGetSelected(cb)}/>
          <p>{this.props.errors}</p>
          <input type="submit" value={`Update Team`}/>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTeamForm);
