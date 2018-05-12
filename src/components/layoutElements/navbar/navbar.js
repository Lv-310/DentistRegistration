import * as React from 'react';

import Login from '../../users/login';
import Signup from '../../users/signup';
import MainMenu from '../navbar/mainMenu';

class NavBar extends React.Component {
    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            SoftServe Dentistry
                        </a>
                        <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
                            &#9776;
                        </button>
                        <div className="collapse navbar-collapse" id="exCollapsingNavbar">
                            <ul className="nav navbar-nav float-left">
                            <MainMenu />
                            </ul>
                            <ul className="nav navbar-nav ml-auto float-right">
                                <li>
                                    <a className="text-light mr-sm-4 nav-link" data-toggle="modal" data-target="#registerModal">Registration</a>
                                </li>
                                <li>
                                    <a className="text-light nav-link" data-toggle="modal" data-target="#loginModal">Login</a>
                                </li>
                            </ul>  
                            </div>
                        </div>
                </nav>
                <Login />
                <Signup />
            </div>
        );
    }
}    
export default NavBar;