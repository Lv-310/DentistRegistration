import React from 'react';
import ReactDOM from 'react-dom';
import baseURL from '../../helpers/url';
import {isMobile} from 'react-device-detect';
import jwt_decode from 'jwt-decode'
import {fetchFrom} from '../../helpers/fetcher';
import UploadAvatar from '../azure/UploadAvatar';
import "./doctorprofilecard.css";
import azureSasAndUrl from '../../helpers/azureurlandsas';

class DoctorsProfileCard extends React.Component{
  constructor() {
    super();
    this.state = {
      doctor: {},
      id: 0,
      path:""
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
    .then(results => this.setState({doctor: results.data}))
  }
  
  // <i class="fas fa-sort-down"></i>
  render() {
    return (
      
        <div className="container">

            <div className="row" align="middle">
                <div className="col-md-12" >
                <h1> {this.state.doctor.FirstName} {this.state.doctor.LastName}</h1>
                        <img src={azureSasAndUrl.avatar.concat(this.state.doctor.AvatarPath)}
                        alt="no image" className="my-img center-block    img-responsive" /> 
                        
                    <div className="panel panel-default">
                    <div className="panel-body">
                                <div className="row">
                                <div className="col-md-12">
                                <UploadAvatar PhoneNum={this.state.doctor.PhoneNum} />

                                    <p><strong>Phone: </strong> {this.state.doctor.PhoneNum} </p> 
                                    <p><strong>Speciality: {this.state.doctor.Speciality}  </strong></p>
                                </div>         
                                <div className="col-md-12">
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
