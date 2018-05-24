import * as React from 'react';
import NavBar from '../layoutElements/navbar/navbar';
import Footer from '../layoutElements/footer';
import Calendar from '../calendar/Calendar';
import Select from '../pageBuilder/Select';
import DoctorsList from '../doctors/DoctorsList';
import jwt_decode from 'jwt-decode'

class UserHomePage extends React.Component{
    render() {
        return (
            <div className="row" id="main-content">
                <div className="col-md-2">
                    <DoctorsList />
                </div>
                <div className="col-md-10">
                    <div className="h1">
                        Hello, {jwt_decode(localStorage.getItem("token")).FirstName + " " + jwt_decode(localStorage.getItem("token")).LastName} 
                    </div>
                    <Select />
                </div>
            </div>
        );
    }
}
export default UserHomePage;