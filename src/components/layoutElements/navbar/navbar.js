import * as React from 'react';

import Login from '../../users/login';
import Signup from '../../users/signup';
import MainMenu from '../navbar/mainMenu';
import Logout from '../../users/Logout';

var role = "";

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logout: false,
        };
      }

    componentWillReceiveProps() {
        if (localStorage.getItem("userId")!=null)
        {
            this.setState({logout:true});
            role = localStorage.getItem("role");
        }
    }

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
                            <MainMenu role={role}/>
                            </ul>
                            <ul className="nav navbar-nav ml-auto float-right">                           
                                {!this.state.logout?
                                <li>
                                    <a className="text-light mr-sm-4 nav-link" data-toggle="modal" href="" data-target="#registerModal">Registration</a>
                                </li>
                                :null}
                                
                                {!this.state.logout?
                                <li>
                                    <a className="text-light nav-link" data-toggle="modal" href=""  data-target="#loginModal">Login</a>
                                </li>
                                :null}

                                 {this.state.logout?<li><a className="text-light mr-sm-4 nav-link" href="#">
                                    {localStorage.getItem("FirstName") + " " + localStorage.getItem("LastName")}</a></li>
                                :null}         
                                                    
                                {this.state.logout?<li><Logout/></li>:null}                                
                            </ul>  
                            </div>
                        </div>
                </nav>
                <Login/>
                <Signup/>
               
                
                
            </div>
        );
    
    }
}    
export default NavBar;