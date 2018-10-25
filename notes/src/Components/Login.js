import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }



    handleChange = (e) => {

        this.setState({[e.target.name]: e.target.value});
    }

    handleClick = (e) => {
        let promise = axios.post("http://localhost:7000/auth/login", this.state);

        promise 
            .then(response => {
                console.log("response", response);
                const token = localStorage.setItem("jwt", response.data.token);
                console.log(token);
                if(token){
                    this.props.history.push("/notes");
                }
                
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div className="login-wrapper">
                <div className="login_register">
                    <h1 className="login_here">Login Here</h1>
                    <div className="input_credentials">
                        <label>Username: </label>
                        <input onChange={this.handleChange} name= "username" value={this.state.username} className="input_box" type="text" required/>
                    </div>
                    <div className="input_credentials">
                        <label>Password: </label>
                        <input onChange={this.handleChange} name="password" value={this.state.password} className="input_box" type="password" required/>
                    </div>
                    <p className="register_login">No account?  <br/><Link className="header-link" to='/register'>Register here</Link></p>
                    <div onClick={this.handleClick} className="button-submit">Submit</div>
                </div>
            </div>
        );
    }
}

export default Login;