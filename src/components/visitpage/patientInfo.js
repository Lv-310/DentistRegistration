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

    render(){
        return(
            <div className="container ">
                <div className="row" align="middle">
                    <div className="col-md-12" >
                        <div className="card border-top-0">
                            <div className="card-body" align="left">
                                <p><strong>MucosalCondition : </strong>{this.state.patientInfo.MucosalCondition}</p>
                                <p><strong>Bite : </strong>{this.state.patientInfo.Bite}</p>
                                <p><strong>DoctorSupervision : </strong>{this.state.patientInfo.DoctorSupervision}</p>
                                <p><strong>DrugUse : </strong>{this.state.patientInfo.DrugUse}</p>
                                <p><strong>Complains : </strong>{this.state.patientInfo.Complains}</p>
                                <p><strong>Anesthesia : </strong>{this.state.patientInfo.Anesthesia}</p>
                                <p><strong>FirstVisit : </strong>{this.state.patientInfo.FirstVisit}</p>
                                <p ><strong>Allergies : </strong>
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
                <PatientInfoRegForm />  
            </div>

        );
    }
}

export default PatientInfo;