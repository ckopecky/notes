import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
    render() {
        return (
            <div className="register-wrapper">
                <div className="login_register">
                    <h1 className="register_here">Register Here</h1>
                    <div className="register_credentials">
                        <label>Username: </label>
                        <input className="register_box" type="text" required/>
                    </div>
                    <div className="register_credentials">
                        <label>First Name: </label>
                        <input className="register_box" type="text" required/>
                    </div>
                    <div className="register_credentials">
                        <label>Last Name: </label>
                        <input className="register_box" type="text" required/>
                    </div>
                    <div className="register_credentials">
                        <label>Password: </label>
                        <input className="register_box" type="password" required/>
                    </div>
                    <div className="register_credentials">
                        <label>Confirm Password: </label>
                        <input className="register_box" type="password" required/>
                    </div>
                    <p className="register_login">{` Already have an account? Log in `} <br/> <Link className="header-link" to='/login'>here</Link></p>
                    <div className="button-submit">Submit</div>
                </div>
            </div>
        );
    }
}

export default Register;