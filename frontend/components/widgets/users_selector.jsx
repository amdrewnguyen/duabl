import React from 'react';

import UserFinderPicker from './user_finder_picker';

class UsersSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUsers: this.props.selectedUsers ?
        this.props.selectedUsers :
        [],
    };

    this.props.sendGetSelected(this.getSelectedUserIds.bind(this));
    this.addUserToSelected = this.addUserToSelected.bind(this);
    this.removeSelectedUser = this.removeSelectedUser.bind(this);
  }

  getSelectedUserIds() {
    let uIds = this.state.selectedUsers.map((user) => (user.id));
    return uIds;
  }

  removeSelectedUser(userId) {
    return (e) => {
      const newSelectedUsers = [];
      this.state.selectedUsers.forEach(
        (user) => {
          if (user.id != userId) {
            newSelectedUsers.push(user);
          }
        }
      );
      this.setState({selectedUsers: newSelectedUsers});
    };
  }

  addUserToSelected(user) {
    this.setState({selectedUsers: this.state.selectedUsers.concat(user)});
  }

  render() {
    let userItems = this.state.selectedUsers.map(
      (user) => (
        <div className="selected-user"
             key={user.id}
             onClick={this.removeSelectedUser(user.id)}>
          {user.name}
        </div>
      )
    );
    return (
      <div className="users-selector" style={this.props.style} >
        <div className="selected-users">
          <div className="selected-user"
               key={this.props.currentUser.id}
               >
            {this.props.currentUser.name}
          </div>
          {userItems}
        </div>
        <UserFinderPicker action={this.addUserToSelected}
          ignore={[this.props.currentUser, ...this.state.selectedUsers]}/>
      </div>
    );
  }
}

export default UsersSelector;
