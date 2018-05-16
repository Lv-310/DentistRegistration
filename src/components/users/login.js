import * as React from 'react';
import jwt_decode from 'jwt-decode';
import { loginUser } from './loginUser';
import { checkToken } from './tokenService';
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNum: "",
            password: "",

            formErrors: {
                phoneNum: '',
                password: '',
                wrongCredentials: ''
            },

            phoneNumValid: false,
            passwordValid: false,
            formValid: false,
            wrongCredentials: false
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    handleSubmit = (event) => {
        event.preventDefault()

        const loginParams = {
            phoneNum: this.state.phoneNum,
            password: this.state.password
        }

        loginUser(loginParams)
            .then(user=> this.handleWrongUser(user))
            .then((user) => {
            if(user.statusCode != 200) return;
            localStorage.setItem("userId", user.data.authorizedUser.Id);
            localStorage.setItem("userToken", user.data.token);
            var decoded = jwt_decode(user.data.token);
            var tokenDurating = decoded.exp * 1000;
            localStorage.setItem("tokenDurating", tokenDurating);
            checkToken();
            document.getElementById('login-modal-close').click();
            var role = user.data.authorizedUser.Role;
            switch(role) {
                case 'user':
                    this.props.history.push('/Users/' + user.data.authorizedUser.Id);
                    break;
                case 'doctor':
                    this.props.history.push('/Doctors/' + user.data.authorizedUser.Id);
                    break;
                case 'admin':
                    this.props.history.push('/Admins/' + user.data.authorizedUser.Id);
                break;
                default:
                break;
            }
            
        })

    }

    handleWrongUser(user)
    {
        if(user.statusCode!=200)
        {
            this.state.wrongCredentials = true;
        }

        if(user.data.Message != undefined)
        {
            this.showErrorMessage(user.data.Message);
        }

        return user;
    }

    showErrorMessage(message)
    {
        let errors = this.state.formErrors;
        errors.wrongCredentials = this.state.wrongCredentials ? message : '';
        this.setState({formErrors: errors});
    }

    clearErrorMessage()
    {
        let errors = this.state.formErrors;
        errors.wrongCredentials = '';
        this.setState({formErrors: errors});
    }

    handleUserInput = (e) => {
        this.wrongCredentials = false;
        this.clearErrorMessage();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });       
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let phoneNumValid = this.state.phoneNumValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'phoneNum':
                phoneNumValid = value.match(/^[0-9]{12}$/);
                fieldValidationErrors.phoneNum = phoneNumValid ? '' : 'Numbers less than 12 or incorrect';
                break;
            case 'password':
                passwordValid = value.length >= 6 && value.length <= 15;
                fieldValidationErrors.password = passwordValid ? '' : 'Password less than 6 or bigger than 15 characters';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            phoneNumValid: phoneNumValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({
            formValid:
                this.state.phoneNumValid && this.state.passwordValid
        });
    }

    errorBorder(error) {
        return (error.length === 0 ? '' : "border border-danger");
    }

    clearForm = () => {
        this.clearErrorMessage();
        this.setState({
            phoneNum: '',
            password: '',
        });

    }

    render() {
        return (

            <div id="loginModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4>Login</h4>
                            <button type="button" id="login-modal-close" className="close" data-dismiss="modal" onClick={this.clearForm}> &times;</button>

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
                                <div className="error-message">{this.state.formErrors.wrongCredentials}</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
