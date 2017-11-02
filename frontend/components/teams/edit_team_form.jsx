import React from 'react';
import { connect } from 'react-redux';

import { updateTeam } from '../../actions/team_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.team,
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
    this.state = Object.assign({}, this.props.team);
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
    this.props.updateTeam(this.state)
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
          <input type="text" value={this.state.members}
                 onChange={this.update("members")}/>
          <br></br>
          <p>{this.props.errors}</p>
          <input type="submit" value={`Update Team`}/>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTeamForm);
