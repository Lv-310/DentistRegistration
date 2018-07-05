import React from 'react';
import ReactDOM from 'react-dom';
import VisitProfileCard from './VisitProfileCard';
import Jaw from '../userhomepage/Jaw';
import PatientInfo from './patientInfo';
import Azure from '../azure/Azure';
class Visitpage extends React.Component{ 

    render(){
        return(
            <div className="row">
                <div className="col-sm-5">
                    <VisitProfileCard idfromParent={this.props.match.params.userId}/>
                    <PatientInfo idfromParent={this.props.match.params.userId}/>
                    </div>
                    <div className="col-sm-7">
                    <Jaw />
                    <div><Azure idfromParent={this.props.match.params.userId}/></div>
                    </div>
            </div>  
        );
    }
}

export default Visitpage;