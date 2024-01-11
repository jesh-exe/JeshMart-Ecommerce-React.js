import React, { useEffect, useState } from 'react'
import { NavLink, json } from 'react-router-dom'
import './MainNavbar.css'
import UserService from '../services/UserService';

const MainNavbar = () => {

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        setLoggedInUser(UserService.getUser());
    }, [UserService.getUser()])


    const handleSignout = () => {
        if (window.confirm("Sure to Log Out?")) {
            UserService.signOutUser();
            setLoggedInUser(UserService.getUser());
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" className="bi bi-cart4 ms-3" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                    </svg>
                    <NavLink to='/' className='heads'>
                        <a className="text-light display-6 ms-3 pe-5 pb-2" style={{ textDecoration: "none" }}>Jayesh-Mart</a>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto fs-5 mb-2 mb-lg-0" >
                            <li className="nav-item mt-1">
                                <NavLink to='/product' className='heads' >
                                    <a className="nav-link heads" aria-current="page" href="#">Products</a>
                                </NavLink>
                            </li>
                        </ul>
                        {/* <button className='btn btn-outline-light'>Login / Signup</button> */}
                        <div className="dropdown-center">
                            <a className="me-2" type='button' data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                {
                                    loggedInUser !== null ?

                                        <>
                                            <NavLink to="/profile" style={{ "textDecoration": "none" }}>
                                                <li ><button className="dropdown-item" type="button">Show Profile</button></li>
                                            </NavLink>
                                            <li><button className="dropdown-item" type="button">Orders</button></li>
                                            <li><button className="dropdown-item" type="button">Settings</button></li>
                                            <li><button className="dropdown-item" type="button" onClick={handleSignout} >Sign Out</button></li>
                                        </>

                                        :
                                        <>
                                            <NavLink to="/login" style={{ "textDecoration": "none" }}>
                                                <li><button className="dropdown-item" type="button">Login</button></li>
                                            </NavLink>
                                            <NavLink to="/signup" style={{ "textDecoration": "none" }}>
                                                <li><button className="dropdown-item" type="button">Signup</button></li>
                                            </NavLink>
                                        </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default MainNavbar
