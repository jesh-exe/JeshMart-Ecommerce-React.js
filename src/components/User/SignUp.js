import React from 'react'
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const handleSignUp = (event) => {
        event.preventDefault();
        var signUpCreds = {
            name : event.target.name.value,
            email : event.target.email.value,
            password : event.target.password.value,
            address : event.target.address.value
        }
        UserService.setUser(signUpCreds);
        alert("Signed Up!");
        navigate("/product")
    }

    return (
        <div className='container'>
            <h2 className='text-center p-2 mb-4 display-5'>Sign Up Form</h2>
            <div className='row'>
                <div className='col-md-3'></div>
                <form className='col-md-6 bg-light border border-success p-3 rounded-4' onSubmit={handleSignUp}>
                    <div className="form-group mt-3 mb-4">
                        <label className='ps-1 mb-2 lead' htmlFor="name">Full Name</label>
                        <input type="text" className="form-control w-100 lead" id="name" required placeholder="Enter Full Name" />
                    </div>
                    <div className="form-group mb-4">
                        <label className='ps-1 mb-2 lead' htmlFor="email">Email</label>
                        <input type="email" className="form-control lead" id="email" required placeholder="Enter Email" />
                    </div>
                    <div className="form-group mb-4">
                        <label className='ps-1 mb-2 lead' htmlFor="password">Password</label>
                        <input type="password" className="form-control lead" id="password" required placeholder="Enter Password" />
                    </div>
                    <div className="form-group mb-4">
                        <label className='ps-1 mb-2 lead' htmlFor="address">Address</label>
                        <input type="text" className="form-control lead" id="address" required placeholder="Enter Full Address" />
                    </div>
                    <p className='text-center'>
                    <button type="submit" className="btn btn-outline-success">Sign in</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp
