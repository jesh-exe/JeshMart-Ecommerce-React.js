import React from 'react'
import UserService from '../../services/UserService';
import { NavLink, useNavigate } from 'react-router-dom';
import MainNavbar from '../MainNavbar';
import './Login.css'

const Login = (props) => {

    const navigate = useNavigate();
    const handleLogin = (event) => {
        event.preventDefault();
        var loginObj = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        var msg = UserService.checkUser(loginObj);
        if (msg === "Success") {
            alert("Logged In Successfully!");
            props.authenticated();
            navigate("/product")
        }
        else {
            alert(msg);
        }
    }

    return (
        <div className='container'>
            <h2 className='text-center p-2 mb-4 display-5'>Login Page</h2>
            <div className='row'>
                <div className='col-md-3'></div>
                <form className='ms-1 me-1 col-sm-12 col-md-6 bg-white border border-success p-5 jesh rounded-4' onSubmit={handleLogin}>
                    <div className="form-group mb-4">
                        <label className='ps-1 mb-2 lead' htmlFor="email">Email</label>
                        <input type="email" className="form-control lead" id="email" required placeholder="Enter Email" />
                    </div>
                    <div className="form-group mb-4">
                        <label className='ps-1 mb-2 lead' htmlFor="password">Password</label>
                        <input type="password" className="form-control lead" id="password" required placeholder="Enter Password" />
                    </div>
                    <p className='text-center'>
                        <button type="submit" className="btn btn-outline-success me-4">Log in</button>
                        <NavLink to="/signup" style={{ "textDecoration": "none" }}>
                            <button type="button" className="btn btn-outline-primary">Sign Up</button>
                        </NavLink>

                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
