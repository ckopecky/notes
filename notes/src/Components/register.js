import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmedPassword: "",
        }


    }

    handleChange = (e) => {

        this.setState({[e.target.name]: e.target.value});
    }

    handleClick = (e) => {
        let promise = axios.post("http://localhost:7000/auth/register", this.state);

        promise 
            .then(response => {
                console.log("response", response);
                localStorage.setItem("jwt", response.data.token);
                this.props.history.push("/login");
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        console.log(this.state);

        return (
            <div className="register-wrapper">
                <div className="login_register">
                    <h1 className="register_here">Register Here</h1>
                    <div className="register_credentials">
                        <label>Username: </label>
                        <input name="username" value={this.state.username}onChange={this.handleChange}className="register_box" type="text" required/>
                    </div>
                    <div className="register_credentials">
                        <label>First Name: </label>
                        <input onChange={this.handleChange} name="firstName" value={this.state.firstName}className="register_box" type="text" required/>
                    </div>
                    <div className="register_credentials">
                        <label>Last Name: </label>
                        <input onChange={this.handleChange} name="lastName" value={this.state.lastName}className="register_box" type="text" required/>
                    </div>
                    <div className="register_credentials">
                        <label>Password: </label>
                        <input onChange={this.handleChange} name="password" value={this.state.password}className="register_box" type="password" required/>
                    </div>
                    <div className="register_credentials">
                        <label>Confirm Password: </label>
                        <input onChange={this.handleChange} name="confirmedPassword" value={this.state.confirmedPassword} className="register_box" type="password" required/>
                    </div>
                    <p className="register_login">{` Already have an account? Log in `} <br/> <Link className="header-link" to='/login'>here</Link></p>
                    <div className="button-submit" onClick={this.handleClick}>Submit</div>
                </div>
            </div>
        );
    }
}

export default Register;