import React from 'react';
import merge from 'lodash/merge';

import ProfileImage from '../widgets/profile_image';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = merge({imageUrl: "", imageFile: null}, props.currentUser);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const file = this.state.imageFile;

    const formData = new FormData();
    formData.append("user[name]", this.state.name);
    // our backend can't handle a null image, so why even
    if (file) formData.append("user[image]", file);
    console.log(formData.getAll("user"));

    this.props.updateUser(formData)
      .then(
        () => this.props.closeModal(),
        () => console.log("error")
      );
  }

  handleClick(e) {
    e.stopPropagation();
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];

    reader.onloadend = () =>
      this.setState({ imageUrl: reader.result, imageFile: file});

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
  }

  render() {
    return (
        <div className="modal" onClick={this.handleClick}>
          <h2>{`My Profile Settings`}</h2>

          <form onSubmit={this.handleSubmit}>
            <div className="add-photo-section">
             <ProfileImage user={this.props.currentUser} size={50}/>
             <label htmlFor="file">Add a profile photo
               <input hidden onChange={this.handleFile} type="file" id="file" name="image" />
             </label>
            </div>
            {
              this.state.imageFile ? (
                <div className="profile-image">
                  <img src={this.state.imageUrl}></img>
                </div>
              ) : (
                null
              )
            }
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
