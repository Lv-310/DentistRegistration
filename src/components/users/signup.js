import React from 'react';
import {signupUser} from './loginUser';

class Signup extends React.Component{
   constructor(props) { 
    super(props);
    this.state = {
            firstname:"",
            lastname:"",
            email:"",
            phoneNum: "",
            password: "",
            confirmPassword: "",
            formErrors: {
                firstname: '', 
                lastname: '',
                email: '',
                phoneNum: '',
                password: '',
                confirmPassword: ''},
            firstnameValid: false,
            lastnameValid: false,
            emailValid: false,
            phoneNumValid: false,
            passwordValid: false,
            confirmPasswordValid: false,
            formValid: false
  }
            
    this.handleUserInput= this.handleUserInput.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
   }
   
    handleSubmit = (event) => {
        event.preventDefault()
        
        const signupParams = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phoneNum: this.state.phoneNum,
            password: this.state.password
            }

            signupUser(signupParams).then((user) => {
                localStorage.setItem("id", user.user_id)
                }).then(setTimeout(function () { window.location.reload(); }, 10))
                .then(setTimeout(function () { window.location.reload(); }, 10));
      }

      handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
      }

      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let firstnameValid = this.state.firstnameValid;
        let lastnameValid = this.state.lastnameValid;
        let emailValid = this.state.emailValid;
        let phoneNumValid= this.state.phoneNumValid;
        let passwordValid = this.state.passwordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;
    
        switch(fieldName) {
            case 'firstname':
                firstnameValid = value.match(/^[a-zA-Z]+$/) && value.length>0;
                fieldValidationErrors.firstname = firstnameValid ? '' : 'First name is incorrect';
            break;
            case 'lastname':
                lastnameValid = value.match(/^[a-zA-Z]+$/) && value.length>0;
                fieldValidationErrors.lastname = lastnameValid ? '' : 'Last name is incorrect';
            break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email is incorrect';
            break;
            case 'phoneNum':
                phoneNumValid = value.match(/^[0-9]+$/) && value.length===12;
                fieldValidationErrors.phoneNum = phoneNumValid ? '' : 'Numbers less than 12 or incorrect';
            break;
            case 'password':
                passwordValid = value.length >= 6 && value.length<=15;
                fieldValidationErrors.password = passwordValid ? '': 'Password less than 6 or bigger than 15 characters';
            break;
            case 'confirmPassword':
                confirmPasswordValid = this.state.password === this.state.confirmPassword && value.length >=6;
                fieldValidationErrors.confirmPassword = confirmPasswordValid ? '': 'The passwords does not match';
            break;
            default:
            break;
        }

        this.setState({formErrors: fieldValidationErrors,
                        firstnameValid: firstnameValid,
                        lastnameValid: lastnameValid,
                        emailValid: emailValid,
                        phoneNumValid: phoneNumValid,
                        passwordValid: passwordValid,
                        confirmPasswordValid: confirmPasswordValid
                      }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid:
            this.state.firstnameValid && this.state.lastnameValid && this.state.emailValid && 
            this.state.phoneNumValid && this.state.passwordValid && this.state.confirmPasswordValid});
      }
    
       errorBorder(error) {
        return(error.length === 0 ? '' : "border border-danger");
    }

    render(){
        return (
            <div id="registerModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4>Registration</h4>
                            <button type="button" className="close" data-dismiss="modal"> &times;</button>
                        </div>
                        <div className="modal-body col-lg-12">
                            <form id="ajax-register-form" action="" method="post" autoComplete="off" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.firstname)}`} placeholder="First Name" required="required" name="firstname"
                                    onChange={this.handleUserInput} value={this.state.firstname}/>
                                    <div className="error-message"> {this.state.formErrors.firstname}</div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.lastname)}`} placeholder="Last Name" required="required" name="lastname"
                                        onChange={this.handleUserInput} value={this.state.lastname} />
                                    <div className="error-message"> {this.state.formErrors.lastname}</div>
                                </div>
                                <div className="form-group">
                                    <input type="email" className={`form-control ${this.errorBorder(this.state.formErrors.email)}`} placeholder="Email" required="required" name="email"
                                        onChange={this.handleUserInput} value={this.state.email} />
                                    <div className="error-message">{this.state.formErrors.email}</div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.phoneNum)}`} placeholder="Phone Number" required="required" name="phoneNum"
                                        onChange={this.handleUserInput} value={this.state.phoneNum} />
                                    <div className="error-message">{this.state.formErrors.phoneNum}</div>
                                </div>
                                <div className="form-group">
                                    <input type="password" className={`form-control ${this.errorBorder(this.state.formErrors.password)}`} placeholder="Password" required="required" name="password"
                                        onChange={this.handleUserInput} value={this.state.password} />
                                    <div className="error-message">{this.state.formErrors.password}</div>
                                </div>
                                <div className="form-group">
                                    <input type="password" className={`form-control ${this.errorBorder(this.state.formErrors.confirmPassword)}`} placeholder="Confirm Password" required="required"
                                        name="confirmPassword"
                                        onChange={this.handleUserInput} value={this.state.confirmPassword} />
                                    <div className="error-message">{this.state.formErrors.confirmPassword}</div>
                                </div>
                                <button className="btn btn-secondary btn-block" disabled={!this.state.formValid}> 
                                    Sign up 
                                </button>
                                <a href="/" className="btn btn-secondary btn-block">Cancel</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
}
export default Signup;
