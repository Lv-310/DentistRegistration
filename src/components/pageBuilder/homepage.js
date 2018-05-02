import * as React from 'react';
import NavBar from '../layoutElements/navbar/navbar';
import Footer from '../layoutElements/footer';
import Calendar from '../calendar/Calendar';
import DoctorsList from '../doctors/DoctorsList';
import './homepage.css';

class Homepage extends React.Component{
    render() {
        return(
            <div className="my-div">
                <NavBar />
                <div className="row">
                    <div className="col-xl-2">
                    <DoctorsList />
                    </div>
                    <div className="col-xl-10">
                    <Calendar />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default Homepage;