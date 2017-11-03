import React from 'react';
import { connect } from 'react-redux';

import { createTeam } from '../../actions/team_actions';
import UsersSelector from '../widgets/users_selector';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.team,
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createTeam: (team) => dispatch(createTeam(team)),
  };
};

class NewTeamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "", memberIds: [], getSelectedUserIds: null};
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
      name: this.state.name,
    };
    let memberIds = this.state.getSelectedUserIds();
    if (!memberIds) {
      memberIds = [];
    }
    this.props.createTeam({team: newTeam, memberIds})
      .then(
        () => this.props.closeModal(),
        () => console.log("error")
      );
  }

  render() {
    return (
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add a New Team</h2>
        <form className="new-team-form" onSubmit={this.handleSubmit}>
          <label>TEAM NAME</label><br></br>
          <input type="text" value={this.state.name}
                 onChange={this.update("name")}/>
          <br></br>
          <label>MEMBERS</label><br></br>
          <UsersSelector currentUser={this.props.currentUser} sendGetSelected={(cb) => this.sendGetSelected(cb)}/>
          <p>{this.props.errors}</p>
          <input type="submit" value={`Add New Team`}/>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTeamForm);
