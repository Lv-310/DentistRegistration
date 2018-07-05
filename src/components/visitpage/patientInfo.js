import React from 'react';
import ReactDOM from 'react-dom';
import baseURL from '../../helpers/url';
import {fetchFrom} from '../../helpers/fetcher';
import patientInfoRegForm from './patientInfoRegForm';
import PatientInfoRegForm from './patientInfoRegForm';

class PatientInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            patientInfo : {}
        }
    }

    componentDidMount(){
        this.getPatientInfo();
    }

    
    
    getPatientInfo(){
        fetchFrom("PatientInfo/"+ 1,'get',null)
        .then(results => this.setState({patientInfo: results.data}));
    }

    formatDate = (date) => {
        if(date === undefined) return '';
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
    
        return year + '-' + month + '-' + day;
      }

    render(){
        return(
            <div className="container ">
                <div className="row" align="middle">
                    <div className="col-md-12" >
                        <div className="card border-top-0">
                            <div className="card-body" align="left">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="my_p"><strong>MucosalCondition : </strong>{this.state.patientInfo.MucosalCondition}</p>
                                        <p className="my_p"><strong>Bite : </strong>{this.state.patientInfo.Bite}</p>
                                        <p className="my_p"><strong>DoctorSupervision : </strong>{this.state.patientInfo.DoctorSupervision}</p>
                                        <p className="my_p"><strong>DrugUse : </strong>{this.state.patientInfo.DrugUse}</p>
                                        <p className="my_p"><strong>Complains : </strong>{this.state.patientInfo.Complains}</p>
                                        <p className="my_p"><strong>Anesthesia : </strong>{this.state.patientInfo.Anesthesia}</p>
                                        <p className="my_p"><strong>FirstVisit : </strong>{this.formatDate(new Date(this.state.patientInfo.FirstVisit))}</p>
                                        
                                    </div>
                                    <div className="col-md-6">
                                    <p className="my_p"><strong>Allergies : </strong>
                                        { this.state.patientInfo.Alergies!== undefined?
                                        this.state.patientInfo.Alergies.map((item, index) => {
                                        return <span key={index}>
                                        {" " + item.Name + "; "}
                                        </span>
                                        }
                                        ):null}
                                        </p>
                                        <p><strong>Information : </strong>
                                            { this.state.patientInfo.InfoFields!== undefined?
                                                <ul >
                                            {this.state.patientInfo.InfoFields.map((item, index) => {
                                            return( 
                                            <li key={index}>{" " + item.Name + " : " + (item.Value===true?'yes':'no')}</li>)
                                            
                                            }
                                            )}</ul>:null}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
                <PatientInfoRegForm />  
            </div>

        );
    }
}

export default PatientInfo;