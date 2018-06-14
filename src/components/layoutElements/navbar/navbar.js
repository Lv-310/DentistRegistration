import * as React from 'react';

import Login from '../../users/login';
import Signup from '../../users/signup';
import MainMenu from '../navbar/mainMenu';
import Logout from '../../users/Logout';
import jwt_decode from 'jwt-decode';

var role = "";

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logout: false,
        };
      }

    componentWillMount()
    {
        this.componentWillReceiveProps();
    }
    
    componentWillReceiveProps() {
        if (localStorage.getItem("token")!=null)
        {
            this.setState({logout:true});
            role = jwt_decode(localStorage.getItem("token")).Role;
        }
    }

    getUserHref()
    {
        if(role=="") return "#"
        if(role=="user") return "/Users"
        if(role=="doctor") return "/Doctors"
        if(role=="admin") return "/Admin"
    }

    render() {
       return (
            <div className="container">
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                    <div className="container">
                        <a className="navbar-brand" href="/Home">
                            SoftServe Dentistry
                        </a>
                        <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
                            &#9776;
                        </button>
                        <div className="collapse navbar-collapse" id="exCollapsingNavbar">
                            <ul className="nav navbar-nav float-left" data-toggle="collapse" data-target="#exCollapsingNavbar">
                            <MainMenu role={role}/>
                            </ul>
                            <ul className="nav navbar-nav ml-auto float-right">                           
                                {!this.state.logout?
                                <li data-toggle="collapse" data-target="#exCollapsingNavbar">
                                    <a className="text-light mr-sm-4 nav-link" data-toggle="modal" href="" data-target="#registerModal">Registration</a>
                                </li>
                                :null}
                                
                                {!this.state.logout?
                                <li data-toggle="collapse" data-target="#exCollapsingNavbar">
                                    <a className="text-light nav-link" data-toggle="modal" href=""  data-target="#loginModal">Login</a>
                                </li>
                                :null}

                                 {this.state.logout?<li><a className="text-light mr-sm-4 nav-link" href={this.getUserHref()}>
                                    {jwt_decode(localStorage.getItem("token")).FirstName + " " + jwt_decode(localStorage.getItem("token")).LastName}</a></li>
                                :null}         
                                                    
                                {this.state.logout?<li data-toggle="collapse" data-target="#exCollapsingNavbar"><Logout/></li>:null}                                
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