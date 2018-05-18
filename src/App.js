import * as React from 'react';
import './App.css';

import NavBar from '../src/components/layoutElements/navbar/navbar';
import Footer from '../src/components/layoutElements/footer';
import Homepage from '../src/components/pageBuilder/homepage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {checkVersion} from './helpers/versionChecker';
import UserHomePage from './components/userhomepage/UserHomePage';
import DoctorHomePage from '../src/components/doctorhomepage/DoctorHomePage';
import HttpsRedirect from 'react-https-redirect';
import Providers from 'react-https-redirect';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        canWork: false,
    };
  }

  renderError() {
    return(
      <div></div>
    )
  }

  showError() {
    if(!this.state.canWork)
    {
    this.renderError = function(){
      return(
        <div className="h1 text-center mt-5" id="something-went-wrong">
          Something went wrong
        </div>
      )
     }
    this.setState({canWork:false});
    }
  }

  componentWillMount() {
      checkVersion().then(result=>{return result;}).then(result=>{this.setState({canWork: result});});
      var obj = this;
      setTimeout(function(){obj.showError();},5000);
  }

  render() {
    if(this.state.canWork == true)
      return (
        <Providers>
        <HttpsRedirect>
        <div className="app" id="app-main">
          <div className="my-div">
              <NavBar />
              <Switch>
                <Route path="/Doctors" component={DoctorHomePage} />
                <Route path="/Users/:userId" component={UserHomePage} />
                <Route path="/Admins" component={DoctorHomePage} />
                <Route path="/" component={Homepage} />
              </Switch>
              <Footer />            
            </div>
        </div>
        </HttpsRedirect>
        </Providers>
      )
    else
    return this.renderError();
  }
};
export default App;
