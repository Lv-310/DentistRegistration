import React from 'react';
import ReactDOM from 'react-dom';
import './doctors.css';
import baseURL from '../../helpers/url';
import {isMobile} from 'react-device-detect';
import {Link} from 'react-router-dom';
import { fetchFrom } from '../../helpers/fetcher';

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
    fetchFrom('Doctors','get',null)
    .then(results => this.setState({'items': results.data}));
  }
  
  changeCollapse(){
    if(isMobile)
    document.getElementById("demo").className="collapse";
    else  document.getElementById("demo").className="collapse show";
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
          <button type="button" key={index} className="list-group-item list-group-item-action">
            <Link to={`/${item.Id}`}>
              {item.FirstName} {item.LastName}
            </Link>
          </button>
          </div>
        }
        )}
        </div> 
      </div>
    );
  }
}

export default DoctorsList;