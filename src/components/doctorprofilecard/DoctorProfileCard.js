import React from 'react';
import ReactDOM from 'react-dom';
import baseURL from '../../helpers/url';
import {isMobile} from 'react-device-detect';
import jwt_decode from 'jwt-decode'
import {fetchFrom} from '../../helpers/fetcher';

class DoctorsProfileCard extends React.Component{
  constructor() {
    super();
    this.state = {
      doctor: {},
      id: 0
    }
  }
  componentDidMount(){
    this.getDoctor();
  }

  componentWillMount()
    {
        this.componentWillReceiveProps();
    }
    
    componentWillReceiveProps() {
        if (localStorage.getItem("token")!=null)
        {
            this.setState({id:jwt_decode(localStorage.getItem("token")).Id});
        }
    }

  getDoctor(){
    fetchFrom("Doctors/"+this.state.id,'get',null)
    .then(results => this.setState({doctor: results.data}));
  }

  // <i class="fas fa-sort-down"></i>
  render() {
    return (
        <div className="container">
            <div className="row" align="middle">
                <div className="col-md-12" >
                    <h2> {this.state.doctor.FirstName} {this.state.doctor.LastName}</h2>
                        <img src="http://api.randomuser.me/portraits/men/49.jpg" alt="" className="center-block rounded-circle img-responsive" /> 
                    <div className="panel panel-default">
                    <div className="panel-body">
                                <div className="row">
                                <div className="col-md-12">
                                    <p><strong>Phone: </strong> {this.state.doctor.PhoneNum} </p> 
                                    <p><strong>Speciality: {this.state.doctor.Speciality}  </strong>
                                    </p>
                                </div>         
                                <div className="col-md-12">
                                    <button className="btn btn-success btn-block"><span className="fas fa-user-edit"></span> Change profile </button>
                                </div>
                                </div>
                        </div>
                    </div>
            </div>
            </div>
        </div>
     
    );
  }
}

export default DoctorsProfileCard;
