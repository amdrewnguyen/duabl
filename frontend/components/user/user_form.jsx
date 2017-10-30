import React from 'react';
import merge from 'lodash/merge';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = merge({}, props.currentUser);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(this.props.action);
    this.props.updateUser(this.state)
      .then(
        () => this.props.closeModal(),
        () => console.log("error")
      );
  }

  handleClick(e) {
    e.stopPropagation();
  }

  render() {
    return (
        <div className="modal" onClick={this.handleClick}>
          <h2>{`My Profile Settings`}</h2>

          <form onSubmit={this.handleSubmit}>
            <div>
             <label for="file">Add a profile photo</label>
             <input type="file" id="file" name="image" />
            </div>
            <label>NAME</label><br></br>
            <input type="text" value={this.state.name}
                   onChange={this.update("name")}/>
            <br></br>
            <input type="submit" value={"Update Profile"}/>
          </form>
        </div>
    );
  }
}

export default UserForm;
