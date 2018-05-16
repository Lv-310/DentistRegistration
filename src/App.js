import * as React from 'react';
import './App.css';

import Homepage from './components/pageBuilder/homepage';
import DoctorHomePage from './components/doctorhomepage/DoctorHomePage'

import {checkVersion} from './helpers/versionChecker';


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
      <div className="app" id="app-main">
        <Homepage />
      </div>
    )
    else
    return this.renderError();
  }
};
export default App;
