import * as React from 'react';
import NavBar from '../layoutElements/navbar/navbar';
import Footer from '../layoutElements/footer';
import Calendar from '../calendar/Calendar';
import Select from '../pageBuilder/Select';
import DoctorsList from '../doctors/DoctorsList';

class UserHomePage extends React.Component{
    render() {
        return (
            <div className="row" id="main-content">
                <div className="col-md-2">
                    <DoctorsList />
                </div>
                <div className="col-md-10">
                    <div className="h1">
                        Hello, user with ID {this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1)}
                    </div>
                    <Select />
                </div>
            </div>
        );
    }
}
export default UserHomePage;