import *as React from 'react';

class MainMenu extends React.Component{
    render() {
    
        var role = this.props.role;
        if(role=="")
        return(
                <div className="ml-0">
                    <ul className="nav navbar-nav">
                        <li className="nav-item"><a href="#" className="nav-link">About</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Link</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Service</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">More</a></li>
                    </ul>
                </div>
        );

        if(role=="user")
        return(
                <div className="ml-0">
                    <ul className="nav navbar-nav">
                        <li className="nav-item"><a href="#" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">History</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">About</a></li>
                    </ul>
                </div>
        );

        if(role=="doctor")
        return(
                <div className="ml-0">
                    <ul className="nav navbar-nav">
                        <li className="nav-item"><a href="#" className="nav-link">Patients</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Prices</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">About</a></li>
                    </ul>
                </div>
        );

        if(role=="admin")
        return(
                <div className="ml-0">
                    <ul className="nav navbar-nav">
                        <li className="nav-item"><a href="#" className="nav-link">Doctors</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Services</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Schedule</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Management</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">About</a></li>
                    </ul>
                </div>
        );
    }
}
export default MainMenu;   