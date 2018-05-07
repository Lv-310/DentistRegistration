import React from 'react';
import ReactDOM from 'react-dom';
import './doctors.css';
import baseURL from '../../helpers/url';
import {isMobile} from 'react-device-detect';


class DoctorsList extends React.Component{
  constructor() {
    super();
    this.state = {
      'items': []
    }
  }
  componentDidMount(){
    this.getDoctors();
    this.changeCollapse();
  }

  getDoctors(){
    fetch(`${baseURL}/Doctors`)
    .then(results => results.json())
    .then(results => this.setState({'items': results}));
  }
  

  changeCollapse(){
    if(isMobile)
    document.getElementById("demo").className="collapse";
    else  document.getElementById("demo").className="collapse show";
  }

  render() {
    return (
      <div className="list-group">
      <a href="#" data-toggle="collapse" data-target="#demo" className="list-group-item active my-list-header btn-secondary"  id="first">DOCTORS</a>
        <div id="demo" className="collapse show">
        {this.state.items.map((item,index) => {
          return <button type="button" key={index} className="list-group-item list-group-item-action">
            {item.FirstName} {item.LastName}
            </button>
        }
        )}
        </div> 
      </div>
    );
  }
}

export default DoctorsList;





