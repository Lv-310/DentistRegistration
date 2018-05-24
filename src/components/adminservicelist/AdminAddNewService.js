import React from 'react';
import { withRouter } from 'react-router-dom';
import { AddService } from '../adminservicelist/AddService';



class AdminAddNewService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Description: "",

            formErrors: {
                Name: '',
                Description: '',

            },
            ServiceNameValid: false,
            ServiceDescriptionValid: false,
            formValid: false
        }

        this.handleAdminInput = this.handleAdminInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const insertParams = {
            Name: this.state.Name,
            Description: this.state.Description

        }

        AddService(insertParams).then((item => {
            if (item.statusCode != 200) {
                var state = this.state;
                state.formErrors.userExist = item.data.Message;
                this.setState(state);
                return;
            }
            document.getElementById('service-modal-close').click();
            window.location.reload();
        }));
    }

    handleAdminInput = (e) => {
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
        let ServiceNameValid = this.state.ServiceNameValid;
        let ServiceDescriptionValid = this.state.ServiceDescriptionValid;

        switch (fieldName) {
            case 'Name':
                ServiceNameValid = value.match(/^[a-zA-Z]+$/) && value.length > 0;
                fieldValidationErrors.Name = ServiceNameValid ? '' : 'Service name is incorrect';
                break;
            case 'Description':
                ServiceDescriptionValid = value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) && value.length > 0;
                fieldValidationErrors.Description = ServiceDescriptionValid ? '' : 'Description is incorrect';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            ServiceNameValid: ServiceNameValid,
            ServiceDescriptionValid: ServiceDescriptionValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid:
                this.state.ServiceNameValid && this.state.ServiceDescriptionValid
        });

    }

    errorBorder(error) {
        return (error.length === 0 ? '' : "border border-danger");
    }

    clearForm = () => {
        var errors = this.state.formErrors;
        errors.userExist = '';
        this.setState({
            Name: '',
            Description: '',

            formErrors: {
                Name: '',
                Description: ''

            }
        });
    }

    render() {
        return (
            <div id="addService" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4>Add New Service</h4>
                            <button type="button" id="service-modal-close" className="close" data-dismiss="modal" onClick={this.clearForm}
                                data-target="#addService"> &times;
                            </button>

                        </div>
                        <div className="modal-body col-lg-12">
                            <form id="ajax-register-form" action="" value={this.state.value} method="post" autoComplete="off" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.Name)}`}
                                        placeholder="Name" name="Name"
                                        onChange={this.handleAdminInput} value={this.state.Name} />
                                    <div className="error-message"> {this.state.formErrors.Name}</div>
                                </div>

                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.Description)}`}
                                        placeholder="Description" name="Description"
                                        onChange={this.handleAdminInput}
                                        value={this.state.Description} />
                                    <div className="error-message"> {this.state.formErrors.Description}</div>
                                </div>
                                <button className="btn btn-secondary btn-block" disabled={!this.state.formValid}>
                                    Add New Service
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
export default withRouter(AdminAddNewService);