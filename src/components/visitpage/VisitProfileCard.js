import React from 'react';
import ReactDOM from 'react-dom';
import baseURL from '../../helpers/url';
import {isMobile} from 'react-device-detect';
import jwt_decode from 'jwt-decode'
import {fetchFrom} from '../../helpers/fetcher';


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
        <div className="container">
            <div className="row" align="middle">
                <div className="col-md-12" >
                <h1> {this.state.doctor.FirstName} {this.state.doctor.LastName}</h1>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalHrvEmJmi7Ui0Mkv3J3CN9-g10g_QEsclAB5mokha5KgRf7T" 
                        alt="no image" className="my-img center-block    img-responsive" /> 
                        
                    <div className="panel panel-default">
                    <div className="panel-body">
                                <div className="row">
                                <div className="col-md-12">
                                    <p><strong>Phone: </strong> {this.state.doctor.PhoneNum} </p>  
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

export default VisitProfileCard;
