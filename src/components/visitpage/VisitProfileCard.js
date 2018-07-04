import React from 'react';
import ReactDOM from 'react-dom';
import baseURL from '../../helpers/url';
import {isMobile} from 'react-device-detect';
import jwt_decode from 'jwt-decode'
import {fetchFrom} from '../../helpers/fetcher';
import UploadPatientAvatar from '../../components/azure/UploadPatientAvatar';
import azureSasAndUrl from '../../helpers/azureurlandsas';


class VisitProfileCard extends React.Component{
  constructor() {
    super();
    this.state = {
      doctor: {},
      id: 0,
    }
  }
  componentDidMount(){
    this.getDoctor();
  }

  
  getDoctor(){
    fetchFrom("Users/"+this.props.idfromParent,'get',null)
    .then(results => this.setState({doctor: results.data}));
  }



  render() {
    return (
        <div className="container mb-0">
            <div className="row" align="middle">
                <div className="col-md-12" >
                  <div className="card border-bottom-0">
                    <div className="card-header">
                      <h3>Patient info</h3>
                    </div>
                    <div className="card-body">
                      <h4> {this.state.doctor.FirstName} {this.state.doctor.LastName}</h4>
                      <p><strong>Phone: </strong> {this.state.doctor.PhoneNum} </p> 
                      <img src={azureSasAndUrl.avatar.concat(this.state.doctor.AvatarPath)}
                        alt="no image" className="my-img center-block    img-responsive" /> 
                    </div>
                    <UploadPatientAvatar PhoneNumPatient={this.state.doctor.PhoneNum}/>
                                      </div>
              </div>
            </div>
        </div>
     
    );
  }
}

export default VisitProfileCard;
