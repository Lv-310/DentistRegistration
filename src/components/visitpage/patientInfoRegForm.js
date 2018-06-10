import React from 'react';
import ReactDOM from 'react-dom';
import baseURL from '../../helpers/url';
import {fetchFrom} from '../../helpers/fetcher';



class PatientInfoRegForm extends React.Component{
    constructor(){
        super();
        this.state = {
            patientInfo : {
                MucosalCondition:"",
                Bite:"",
                DoctorSupervision:"",
                DrugUse:"",
                Complains:"",
                Anesthesia:"",
                FirstVisit:"",
                Alergies: {},
                InfoField:{}
            },

            formErrors:
            {
                MucosalCondition:"",
                Bite:"",
                DoctorSupervision:"",
                DrugUse:"",
                Complains:"",
                Anesthesia:"",
                success:""
            },
            MucosalConditionValid: false,
                BiteValid: false,
                DoctorSupervisionValid:false,
                DrugUseValid:false,
                ComplainsValid:false,
                AnesthesiaValid:false,
                FirstVisitValid:false,
                formValid: false
            
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
        var errors = this.state.formErrors;
        errors.success = '';
        this.setState({ formErrors: errors });
    }

    handleSubmit =(e)=> {}


    


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let MucosalConditionValid = this.state.MucosalConditionValid;
        let BiteValid = this.state.BiteValid;
        let DoctorSupervisionValid = this.state.DoctorSupervisionValid;
        let ComplainsValid = this.state.ComplainsValid;
        let AnesthesiaValid = this.state.AnesthesiaValid;

        switch (fieldName) {
            case 'MucosalCondition':
                MucosalConditionValid = value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) && value.length > 0;
                fieldValidationErrors.MucosalCondition = MucosalConditionValid ? '' : 'MucosalConditionValid is incorrect';
                break;
            case 'Bite':
                BiteValid = value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) && value.length > 0;
                fieldValidationErrors.Bite = BiteValid ? '' : 'Last name is incorrect';
                break;
            case 'DoctorSupervision':
                DoctorSupervisionValid = value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) && value.length > 0;
                fieldValidationErrors.DoctorSupervision = DoctorSupervisionValid? '' : 'DoctorSupervision is incorrect';
                break;
            case 'Complains':
                ComplainsValid = value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) && value.length > 0;
                fieldValidationErrors.DoctorSupervision = ComplainsValid? '' : 'ComplainsValid is incorrect';
                break;
            case 'Anesthesia':
                AnesthesiaValid = value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) && value.length > 0;
                fieldValidationErrors.Anesthesia = AnesthesiaValid ? '' : 'AnesthesiaValid is incorrect';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            MucosalConditionValid: MucosalConditionValid,
            BiteValid: BiteValid,
            DoctorSupervisionValid: DoctorSupervisionValid,
            ComplainsValid: ComplainsValid,
            AnesthesiaValid: AnesthesiaValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid:
                this.state.firstnameValid && this.state.lastnameValid && this.state.emailValid &&
                this.state.phoneNumValid && this.state.passwordValid && this.state.confirmPasswordValid
        });

    }

    errorBorder(error) {
        return (error.length === 0 ? '' : "border border-danger");
    }

    clearForm = () => {
        var errors = this.state.formErrors;
        errors.success = '';
        this.setState({
            MucosalCondition:"",
                Bite:"",
                DoctorSupervision:"",
                DrugUse:"",
                Complains:"",
                Anesthesia:"",
            formErrors: {
                MucosalCondition:"",
                Bite:"",
                DoctorSupervision:"",
                DrugUse:"",
                Complains:"",
                Anesthesia:"",
                success:""
            }
        });
    }

    render() {
        return (
            <div id="patientInfoModal" className="modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4>Patient Information</h4>
                            <button type="button" id="patientInfo-modal-close" className="close" data-dismiss="modal" onClick={this.clearForm}> &times;</button>
                        </div>
                        <div className="modal-body col-lg-12">
                            <form id="ajax-patientInfoRegister-form" action="" value={this.state.value} method="post" autoComplete="off" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.MucosalCondition)}`} placeholder="Mucosal Condition" required="required" name="MucosalCondition"
                                        onChange={this.handleUserInput} value={this.state.patientInfo.MucosalCondition} />
                                    <div className="error-message"> {this.state.formErrors.MucosalCondition}</div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.Bite)}`} placeholder="Bite" required="required" name="Bite"
                                        onChange={this.handleUserInput} value={this.state.patientInfo.Bite} />
                                    <div className="error-message"> {this.state.formErrors.Bite}</div>
                                </div>
                                <div className="form-group">
                                    <input type="email" className={`form-control ${this.errorBorder(this.state.formErrors.DoctorSupervision)}`} placeholder="Doctor Supervision" required="required" name="DoctorSupervision"
                                        onChange={this.handleUserInput} value={this.state.patientInfo.DoctorSupervision} />
                                    <div className="error-message">{this.state.formErrors.DoctorSupervision}</div>
                                </div>
                                <div className="form-group">
                                    <input type="tel" className={`form-control ${this.errorBorder(this.state.formErrors.Complains)}`} placeholder="Complains" required="required" name="Complains"
                                        onChange={this.handleUserInput} value={this.state.patientInfo.Complains} />
                                    <div className="error-message">{this.state.formErrors.Complains}</div>
                                </div>
                                <div className="form-group">
                                    <input type="password" className={`form-control ${this.errorBorder(this.state.formErrors.Anesthesia)}`} placeholder="Anesthesia" required="required" name="Anesthesia"
                                        onChange={this.handleUserInput} value={this.state.patientInfo.Anesthesia} />
                                    <div className="error-message">{this.state.formErrors.Anesthesia}</div>
                                </div>
                                <button className="btn btn-secondary btn-block" disabled={!this.state.formValid}>
                                    Sign up
                                </button>
                                <div className="error-message">{this.state.formErrors.success}</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



}
export default PatientInfoRegForm;