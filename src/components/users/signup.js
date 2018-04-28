import React from 'react';
import {signupUser} from './loginUser';

class Signup extends React.Component{
   constructor(props) { 
    super(props);
    this.state = {
            firstname:"",
            lastname:"",
            phoneNum: "",
            password: "",
            confirmPassword: ""
    };
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handlePhoneNum = this.handlePhoneNum.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
   }

    handleSubmit = (event) => {
        event.preventDefault()
        
        const signupParams = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phoneNum: this.state.phoneNum,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
            }

            signupUser(signupParams).then((user) => {
                localStorage.setItem("id", user.user_id)
              })
      }

      handleFirstName = (event) => {
        this.setState({firstname: event.target.value})
    
      }
    
      handleLastName = (event) => {
        this.setState({lastname: event.target.value})
      }

      handlePhoneNum = (event) => {
        this.setState({phoneNum: event.target.value})
      }

      handlePassword = (event) => {
        this.setState({password: event.target.value})
      }

      handleConfirmPassword = (event) => {
        this.setState({confirmPassword: event.target.value})
      }

      render(){
        return (
            <li className="dropdown mr-sm-2 my-1" >
            <button className="btn btn-lg btn-outline-secondary text-light" data-toggle="dropdown">Register</button>
            <ul className="dropdown-menu dropdown-lr input-form-center">
                <div className="col-lg-12">
                    <div className="text-center">
                        <h3><b>Register</b></h3>
                    </div>
                    <form id="ajax-register-form" action="" method="post" autoComplete="off" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="First Name" required="required"
                             onChange={this.handleFirstName} value={this.state.firstname} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Last Name" required="required"
                            onChange={this.handleLastName} value={this.state.lastname} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Phone Number" required="required"
                            onChange={this.handlePhoneNum} value={this.state.phoneNum} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" required="required"
                            onChange={this.handlePassword} value={this.state.password} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Confirm Password" required="required"
                            onChange={this.handleConfirmPassword} value={this.state.confirmPassword} />
                        </div>
                        <button className="btn btn-secondary btn-block"> Sign up 
                        </button>
                    </form>
                </div>
            </ul>
        </li>
        );
    } 
}
export default Signup;
