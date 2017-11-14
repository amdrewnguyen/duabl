import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
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

  demoLogin(e) {
    e.preventDefault();
    const user = Object.assign({}, { email: 'demo@duabl.io', password: 'demooo' });
    this.props.login(user);
  }

  render() {
    return (
      <div className="modal-session-overlay">
        <div className="modal">
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
            <div className="login-btn-group">
              <input type="submit" className="demo-login-btn" value="Demo Login" onClick={this.demoLogin}/>
              <input type="submit" value={this.props.formTitle}/>
            </div>
            {this.props.errors.length > 0 ? (
              <p>{this.props.errors}</p>
            ) : (
              null
            )
            }
          </form>
          <br></br>
          <Link to={this.props.otherPath}>{this.props.otherTitle}</Link>
        </div>
      </div>
    );
  }
}

export default SessionForm;
