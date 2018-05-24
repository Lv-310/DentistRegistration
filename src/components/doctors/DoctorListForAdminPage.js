import React from 'react';
import ReactDOM from 'react-dom';
import './DoctorListForAdminPage.css';
import baseURL from '../../helpers/url';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchFrom } from '../../helpers/fetcher';

class DoctorListForAdminPage extends React.Component{
    constructor(){
        super();
        this.state = {
            'DoctorsList': []
        }
    }

    componentDidMount() {
        this.getDoctors();
        this.changeCollapse();

    }


    getDoctors() {
        fetchFrom('Doctors', 'get', null)
            .then(results => this.setState({ 'DoctorsList': results.data }));
    }

    changeCollapse() {
        if (isMobile)
         document.getElementById("demo2").className = "collapse";
        else document.getElementById("demo2").className = "collapse show";
      }


      render() {
        return (
          <div className="list-group">
            <a href="#" data-toggle="collapse" data-target="#demo2" className="list-group-item active my-list-header btn-secondary dropdown-toggle-split" id="first1">Doctors
          <i className="fas fa-sort-down" id="down-arrows"></i>
            </a>
    
            <div id="demo2" className="collapse show">
              {this.state.DoctorsList.map((item, index) => {
                return <div>
                 <button type="button" key={index} className="list-group-item list-group-item-action">
                               
                                {item.FirstName} {item.LastName}
                                <a href="#" className="fas fa-edit float-right"></a>
                                
                </button>
                </div>
              }
              )}
            </div>
          </div>
        );
      }
}

export default DoctorListForAdminPage;