import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import DoctorHomePage from './DoctorHomePage';
import Visitpage from '../visitpage/Visitpage';

class DoctorSwitcher extends React.Component{ 

    render(){
        return(
            <div>
                <Switch>
                  <Route exact path='/Doctors' render={() => <Redirect to="/Doctors/Home" />} />
                  <Route path="/Doctors/Home" component={DoctorHomePage} />
                  <Route path="/Doctors/Visit/:userId" component={Visitpage} />
                </Switch>
            </div>
        );
    }
}

export default DoctorSwitcher;