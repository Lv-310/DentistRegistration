import React from 'react';
import ReactDOM from 'react-dom';
import './doctors.css';
import baseURL from '../../helpers/url';
import {isMobile} from 'react-device-detect';
import {withRouter} from 'react-router-dom';

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

  formatDate = (date) => {

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
  }

  changeDefaultView() {
    if (isMobile)
      return "day";
    else return "week";
  }

  handleCustomerClick(doctor) {
    var currentDate = new Date()
    this.props.history.push(`/doctor/${doctor.Id}/${this.formatDate(currentDate)}/${this.changeDefaultView()}`);
  }
  // <i class="fas fa-sort-down"></i>
  render() {
    return (
      <div className="list-group">
      <a href="#" data-toggle="collapse" data-target="#demo" className="list-group-item active my-list-header btn-secondary dropdown-toggle-split"  id="first">DOCTORS
      <i className="fas fa-sort-down" id="down-arrow"></i>
      </a>

        <div id="demo" className="collapse show">
        {this.state.items.map((item,index) => {
          return <div>
          <button type="button" onClick={() => this.handleCustomerClick(item)} key={index} className="list-group-item list-group-item-action">
              {item.FirstName} {item.LastName}
          </button>
          </div>
        }
        )}
        </div> 
      </div>
    );
  }
}

export default withRouter(DoctorsList);