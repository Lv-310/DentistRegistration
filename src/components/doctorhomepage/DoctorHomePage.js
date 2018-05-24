import * as React from 'react';
import NavBar from '../layoutElements/navbar/navbar';
import Footer from '../layoutElements/footer';
import Calendar from '../calendar/Calendar';
import DoctorProfileCard from '../doctorprofilecard/DoctorProfileCard';
import DoctorCalendar from '../doctorcalendar/DoctorCalendar';
import "./doctorhome.css";

class DoctorHomePage extends React.Component{
    render() {
        return(
                <div className="row" id="main-content">
                        <div className="col-md-4">
                        <DoctorProfileCard />
                        </div>
                        <div className="col-md-8">
                        <DoctorCalendar />
                        </div>
                </div>
        );
    }
}
export default DoctorHomePage;
