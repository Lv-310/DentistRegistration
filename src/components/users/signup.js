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
              })
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
                firstnameValid = value.match(/^[a-zA-Z]*$/);
                fieldValidationErrors.firstname = firstnameValid ? '' : 'First name is incorrect';
            break;
            case 'lastname':
                lastnameValid = value.match(/^[a-zA-Z]*$/);
                fieldValidationErrors.lastname = lastnameValid ? '' : 'Last name is incorrect';
            break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email is incorrect';
            break;
            case 'phoneNum':
                phoneNumValid = value.match(/^[0-9]*$/) && value.length===12;
                fieldValidationErrors.phoneNum = phoneNumValid ? '' : 'Numbers less than 12 or incorrect';
            break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': 'Password less than 6 characters';
            break;
            case 'confirmPassword':
                confirmPasswordValid = (this.state.password === this.state.confirmPassword);
                fieldValidationErrors.confirmPassword = confirmPasswordValid ? '': 'The password does not match';
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
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }

      render(){
        return (
            <li className="dropdown mr-sm-2 my-1">
            <button className="btn btn-lg btn-outline-secondary text-light" data-toggle="dropdown">Register 
                <span className="caret"></span>
            </button>
            <ul className="dropdown-menu dropdown-lr input-form-center">
                <div className="col-lg-12">
                    <div className="text-center">
                        <h3><b>Register</b></h3>
                    </div>
                    <form id="ajax-register-form" action="" method="post" autoComplete="off" onSubmit={this.handleSubmit}>
                        <div className={`form-group  ${this.errorClass(this.state.formErrors.firstname)}`}>
                            <input type="text" className="form-control" placeholder="First Name" required="required" name="firstname"
                                onChange={this.handleUserInput} value={this.state.firstname} />   
                                <span className="error-message">{this.state.formErrors.firstname}</span>   
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.lastname)}`}>
                            <input type="text" className="form-control" placeholder="Last Name" required="required" name="lastname"
                                onChange={this.handleUserInput} value={this.state.lastname} />
                                <span className="error-message">{this.state.formErrors.lastname}</span>
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                            <input type="email" className="form-control" placeholder="Email" required="required" name="email"
                                onChange={this.handleUserInput} value={this.state.email} />
                                <span className="error-message">{this.state.formErrors.email}</span>
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.phoneNum)}`}>
                            <input type="text" className="form-control" placeholder="Phone Number" required="required" name="phoneNum"
                                onChange={this.handleUserInput} value={this.state.phoneNum} />
                                <span className="error-message">{this.state.formErrors.phoneNum}</span>
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                            <input type="password" className="form-control" placeholder="Password" required="required" name="password"
                                onChange={this.handleUserInput} value={this.state.password} />
                                <span className="error-message">{this.state.formErrors.password}</span>
                                
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.confirmPassword)}`}>
                            <input type="password" className="form-control" placeholder="Confirm Password" required="required"
                                name="confirmPassword"
                                onChange={this.handleUserInput} value={this.state.confirmPassword} />
                                <span className="error-message">{this.state.formErrors.confirmPassword}</span>
                        </div>
                        <button className="btn btn-secondary btn-block"> Sign up 
                        </button>
                        <a href="/" className="btn btn-secondary btn-block">Cancel</a>
                    </form>
                </div>
            </ul>
        </li>
        );
    } 
}
export default Signup;
