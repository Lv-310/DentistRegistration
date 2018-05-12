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

  componentWillMount() {
      checkVersion().then(result=>{return result;}).then(result=>{this.setState({canWork: result});})
  }

  render() {
    if(this.state.canWork == true)
    return (
      <div className="app">
        <Homepage />
      </div>
    )
    else
    return(
      <div className="h1 text-center mt-5">
        Something went wrong
      </div>
    )
  }
};
export default App;
