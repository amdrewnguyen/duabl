import React from 'react';
import { connect } from 'react-redux';

import { createTeam } from '../../actions/team_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.team,
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
    this.state = {name: "", members: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.createTeam(this.state)
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
          <label>DESCRIPTION</label><br></br>
          <input type="text" value={this.state.members}
                 onChange={this.update("members")}/>
          <br></br>
          <p>{this.props.errors}</p>
          <input type="submit" value={`Add New Team`}/>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTeamForm);
