import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.update = this.update.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.action(user);
  }

  render() {
    return (
      <div>
        <h2>{this.props.formTitle}</h2>
        <form onSubmit={this.handleSubmit}>
          <label>EMAIL ADDRESS</label><br></br>
          <input type="text" value={this.state.email}
                 onChange={this.update("email")}/>
          <br></br>
          <label>PASSWORD</label><br></br>
          <input type="password" value={this.state.password}
                 onChange={this.update("password")}/>
          <br></br>
          <input type="submit" value={this.props.formTitle}/>
        </form>
        <Link to={this.props.otherPath}>{this.props.otherTitle}</Link>
      </div>
    );
  }
}

export default SessionForm;
