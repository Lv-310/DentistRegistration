import * as React from 'react';
import { loginUser } from './loginUser';



class Login extends React.Component{
    constructor(props) { 
        super(props);
        this.state = {
            phoneNum: "",
            password: "",
            formErrors: {
                phoneNum: '',
                password: ''},
            phoneNumValid: false,
            passwordValid: false,
            formValid: false
    };

    this.handleUserInput =this.handleUserInput.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
}

    handleSubmit = (event) => {
        event.preventDefault()

        const loginParams = {
            phoneNum: this.state.phoneNum,
            password: this.state.password
        }

    loginUser(loginParams).then((user) => {
        //localStorage.setItem("id", user.user_id)
        localStorage.setItem("token", user.token)
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
        let phoneNumValid= this.state.phoneNumValid;
        let passwordValid = this.state.passwordValid;
    
        switch(fieldName) {
            case 'phoneNum':
                phoneNumValid = value.match(/^[0-9]/) && value.length===12;
                fieldValidationErrors.phoneNum = phoneNumValid ? '' : 'Numbers less than 12 or incorrect';
            break;
            case 'password':
                passwordValid = value.length >= 6 && value.length<=15;
                fieldValidationErrors.password = passwordValid ? '': 'Password less than 6 or bigger than 15 characters';
            break;
            default:
            break;
        }

        this.setState({formErrors: fieldValidationErrors,
            phoneNumValid: phoneNumValid,
            passwordValid: passwordValid
        },  this.validateForm);
    }
    validateForm() {
        this.setState({formValid:
        this.state.phoneNumValid && this.state.passwordValid});
    }

    errorBorder(error) {
        return(error.length === 0 ? '' : "border border-danger");
    }

    render(){
        return (
       
            <div id="loginModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4>Login</h4>
                            <button type="button" className="close" data-dismiss="modal"> &times;</button>
                
                        </div>
                    <div className="modal-body col-lg-12">
                        <form id="ajax-login-form" action="" method="post" autoComplete="off" onSubmit={this.handleSubmit}>
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
                            <button className="btn btn-secondary btn-block" disabled={!this.state.formValid}>
                                 Log in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    } 
}
export default Login;
