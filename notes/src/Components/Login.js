import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div className="login-wrapper">
                <div className="login_register">
                    <h1 className="login_here">Login Here</h1>
                    <div className="input_credentials">
                        <label>Username: </label>
                        <input className="input_box" type="text" required/>
                    </div>
                    <div className="input_credentials">
                        <label>Password: </label>
                        <input className="input_box" type="password" required/>
                    </div>
                    <p className="register_here">No account? Register <Link className="header-link" to='/register'>here</Link></p>
                    <div className="button-submit">Submit</div>
                </div>
            </div>
        );
    }
}

export default Login;