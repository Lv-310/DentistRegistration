import React from 'react';
import ReactDOM from 'react-dom';
import './doctors.css';
import baseURL from '../../helpers/url';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchFrom } from '../../helpers/fetcher';

class DoctorsList extends React.Component {
  constructor() {
    super();
    this.state = {
      'items': []
    }
  }

  componentDidMount() {
    this.getDoctors();
    this.changeCollapse();
  }

  getDoctors() {
    fetchFrom('Doctors', 'get', null)
      .then(results =>{this.setState({ 'items': results.data });
      if(isMobile)
      {
        var doctor = document.getElementById("doc-"+this.props.match.params.doctorId);
        if(doctor!=null)
        {
          document.getElementById("first-label").innerText =`Doctor - ${doctor.innerText}`;
        }
      }
      return results;});
  }

  changeCollapse() {
    if (isMobile)
      document.getElementById("demo").className = "collapse";
    else document.getElementById("demo").className = "collapse show";
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
    this.props.history.push(`/Home/doctor/${doctor.Id}/${this.formatDate(currentDate)}/${this.changeDefaultView()}`);
    if (isMobile)
    {
      document.getElementById("first").click();
      document.getElementById("first-label").innerText=`Doctor - ${doctor.FirstName}  ${doctor.LastName}`;
    }
  }
  render() {
    return (
      <div className="list-group">
        <a href="#" data-toggle="collapse" data-target="#demo" className="list-group-item active my-list-header btn-secondary dropdown-toggle-split" id="first">
        <span id="first-label">Select doctor</span>
      <i className="fas fa-sort-down" id="down-arrow"></i>
        </a>

        <div id="demo" className="collapse show">
        <div className="height-scroll">
          {this.state.items.map((item, index) => {
            return <div key={index}>
              <button type="button" id={"doc-"+item.Id} onClick={() => this.handleCustomerClick(item)} key={index} className={item.Id==this.props.match.params.doctorId?
              "list-group-item list-group-item-action active":"list-group-item list-group-item-action"}>
                {item.FirstName} {item.LastName}
              </button>
            </div>
          }
          )}
          </div>
        </div>
      </div>
    );
    
  }
}

export default withRouter(DoctorsList);