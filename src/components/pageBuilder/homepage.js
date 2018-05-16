import * as React from 'react';
import NavBar from '../layoutElements/navbar/navbar';
import Footer from '../layoutElements/footer';
import Calendar from '../calendar/Calendar';
import DoctorsList from '../doctors/DoctorsList';
import UserHomePage from '../userhomepage/UserHomePage'

import Select from './Select';
import './homepage.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class Homepage extends React.Component{
    render() {
        return (
                <div className="my-div">
                    <NavBar />
                    <div className="row" id="main-content">
                        <div className="col-md-2">
                            <DoctorsList />
                        </div>
                        <div className="col-md-10">
                            <Switch>
                                <Route exact path="/" component={Select} />
                                <Route path="/Users/:userId" component={UserHomePage} />                   
                                <Route path="/doctor/:doctorId/:date/:view" component={Calendar} />
                            </Switch>
                        </div>
                    </div>
                    <Footer />
                </div>
        );
    }
}
export default Homepage;