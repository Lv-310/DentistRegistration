import React from 'react';
import { DoctorSignUp } from '../doctors/DoctorSignUp';
import { withRouter } from 'react-router-dom'

class InsertDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstName: "",
            LastName: "",
            PhoneNum: "",
            CabNum:"",
            Speciality:"",            
            Doc_password: "",
            confirmDoc_password: "",
            formErrors: {
                FirstName: '',
                LastName: '',
                PhoneNum: '',
                CabNum:"",
                Speciality:"",            
                Doc_password: '',
                confirmDoc_password: '',
                userExist: ''
            },
            FirstNameValid: false,
            LastNameValid: false,
            PhoneNumValid: false,
            CabNumValid: false,
            SpecialityValid:false,
            Doc_passwordValid: false,
            confirmDoc_passwordValid: false,
            formValid: false
        }

        this.handleUserInput = this.handleUserInput.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const signupParams = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            PhoneNum: this.state.PhoneNum,
            CabNum: this.state.CabNum,
            Speciality: this.state.Speciality,
            Doc_password: this.state.Doc_password
        }

        
        DoctorSignUp(signupParams).then((item => {
            if (item.statusCode != 200) {
                var state = this.state;
                state.formErrors.userExist = item.data.Message;
                this.setState(state);
                return;
            }
            document.getElementById('modal-close').click();
            window.location.reload();
        }));
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
        var errors = this.state.formErrors;
        errors.userExist = '';
        this.setState({ formErrors: errors });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let FirstNameValid = this.state.FirstNameValid;
        let LastNameValid = this.state.LastNameValid;
        let PhoneNumValid = this.state.PhoneNumValid;
        let CabNumValid = this.state.CabNumValid;
        let SpecialityValid = this.state.SpecialityValid;
        let Doc_passwordValid = this.state.Doc_passwordValid;
        let confirmDoc_passwordValid = this.state.confirmDoc_passwordValid;

        switch (fieldName) {
            case 'FirstName':
                FirstNameValid = value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) && value.length > 0;
                fieldValidationErrors.FirstName = FirstNameValid ? '' : 'First name is incorrect';
                break;
            case 'LastName':
                LastNameValid = value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) && value.length > 0;
                fieldValidationErrors.LastName = LastNameValid ? '' : 'Last name is incorrect';
                break;
            case 'PhoneNum':
                PhoneNumValid = value.match(/^[0-9]+$/) && value.length === 12;
                fieldValidationErrors.PhoneNum = PhoneNumValid ? '' : 'PhoneNumber less than 12 or incorrect';
                break;
            case 'CabNum':
                CabNumValid = value.match(/^[0-9]+$/) && value >= 1 && value <= 250 ;
                fieldValidationErrors.CabNum = CabNumValid ? '' : 'CabinetNumber must be from 1 to 250  or incorrect';
                break;
            case 'Speciality':
                SpecialityValid = value.length >= 6 && value.length <= 15;
                fieldValidationErrors.Speciality = SpecialityValid ? '' : 'Speciality less than 6 or bigger than 15 characters';
                break;
            case 'Doc_password':
                Doc_passwordValid = value.length >= 6 && value.length <= 15;
                fieldValidationErrors.Doc_password = Doc_passwordValid ? '' : 'Password less than 6 or bigger than 15 characters';
                break;
            case 'confirmDoc_password':
                confirmDoc_passwordValid = this.state.Doc_password === this.state.confirmDoc_password && value.length >= 6;
                fieldValidationErrors.confirmDoc_password = confirmDoc_passwordValid ? '' : 'The passwords does not match';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            FirstNameValid: FirstNameValid,
            LastNameValid: LastNameValid,
            PhoneNumValid: PhoneNumValid,
            CabNumValid: CabNumValid,
            SpecialityValid: SpecialityValid,
            Doc_passwordValid: Doc_passwordValid,
            confirmDoc_passwordValid: confirmDoc_passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid:
            this.state.FirstNameValid  && this.state.LastNameValid && 
                this.state.PhoneNumValid && this.state.Doc_passwordValid && this.state.confirmDoc_passwordValid 
        });

    }

    errorBorder(error) {
        return (error.length === 0 ? '' : "border border-danger");
    }
    clearForm = () => {
        var errors = this.state.formErrors;
        errors.userExist = '';
        this.setState({
            FirstName: '',
            LastName: '',
            PhoneNum: '',
            CabNum: '',
            Speciality:'',
            Doc_password: '',
            confirmDoc_password: '',
            formErrors: {
                FirstName: '',
                LastName: '',
                PhoneNum: '',
                CabNum: '',
                Speciality:'',
                Doc_password: '',
                confirmDoc_password: ''
            }
        });
    }

    render() {
        return (
            <div id="registerModalDoctor" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4>Add new Doctor</h4>
                            <button type="button" id="modal-close" className="close" data-dismiss="modal" onClick={this.clearForm}> &times;</button>
                        </div>
                        <div className="modal-body col-lg-12">
                            <form id="ajax-registerDoctor-form" action="" value={this.state.value} method="post" autoComplete="off" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.FirstName)}`} placeholder="First Name" required="required" name="FirstName"
                                        onChange={this.handleUserInput} value={this.state.FirstName} />
                                    <div className="error-message"> {this.state.formErrors.FirstName}</div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.LastName)}`} placeholder="Last Name" required="required" name="LastName"
                                        onChange={this.handleUserInput} value={this.state.LastName} />
                                    <div className="error-message"> {this.state.formErrors.LastName}</div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.PhoneNum)}`} placeholder="Phone Number" required="required" name="PhoneNum"
                                        onChange={this.handleUserInput} value={this.state.PhoneNum} />
                                    <div className="error-message">{this.state.formErrors.PhoneNum}</div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.CabNum)}`} placeholder="Cabinet Number" required="required" name="CabNum"
                                        onChange={this.handleUserInput} value={this.state.CabNum} />
                                    <div className="error-message">{this.state.formErrors.CabNum}</div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.Speciality)}`} placeholder="Speciality" required="required" name="Speciality"
                                        onChange={this.handleUserInput} value={this.state.Speciality} />
                                    <div className="error-message">{this.state.formErrors.Speciality}</div>
                                </div>
                                <div className="form-group">
                                    <input type="password" className={`form-control ${this.errorBorder(this.state.formErrors.Doc_password)}`} placeholder="Password" required="required" name="Doc_password"
                                        onChange={this.handleUserInput} value={this.state.Doc_password} />
                                    <div className="error-message">{this.state.formErrors.Doc_password}</div>
                                </div>
                                <div className="form-group">
                                    <input type="password" className={`form-control ${this.errorBorder(this.state.formErrors.confirmDoc_password)}`} placeholder="Confirm Password" required="required"
                                        name="confirmDoc_password"
                                        onChange={this.handleUserInput} value={this.state.confirmDoc_password} />
                                    <div className="error-message">{this.state.formErrors.confirmDoc_password}</div>
                                </div>
                                <button className="btn btn-secondary btn-block" disabled={!this.state.formValid} onClick={document.getElementById("modal-close")}>
                                    Register Doctor 
                                </button>
                                <div className="error-message">{this.state.formErrors.userExist}</div>
                            </form>
                        </div>
                    </div>
                      </div>
            </div>
        );
    }
}
export default withRouter(InsertDoctor);
