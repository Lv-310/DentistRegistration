import React from 'react';
import { withRouter } from 'react-router-dom';
import { addServiceRequest } from '../adminservicelist/AllAdminRequest';


class AddNewService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",

            formErrors: {
                name: '',
                description: '',
                infoMessage: '',

            },
            serviceNameValid: false,
            serviceDescriptionValid: false,
            formValid: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const addedService = {
            name: this.state.name,
            description: this.state.description

        }
        addServiceRequest(addedService).then((response => {
            if (response.statusCode != 200) {
                var state = this.state;
                this.state.formErrors.infoMessage = response.data.Message;
                this.setState(this.state);
                return;
            }
            document.getElementById('service-modal-close').click();
            window.location.reload();
        }));
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
    validateForm() {
        this.setState({
            formValid:
                this.state.serviceNameValid &&
                this.state.serviceDescriptionValid
        });

    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let serviceNameValid = this.state.serviceNameValid;
        let serviceDescriptionValid = this.state.serviceDescriptionValid;

        switch (fieldName) {
            case 'name':
                serviceNameValid = value.match(/^[a-zA-Z\s]*$/) && value.length >= 0;
                fieldValidationErrors.name = serviceNameValid ? '' : 'Service Name is incorrect';
                break;
            case 'description':
                serviceDescriptionValid = value.match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/) && value.length >= 0;
                fieldValidationErrors.description = serviceDescriptionValid ? '' : 'Description is incorrect';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            serviceNameValid: serviceNameValid,
            serviceDescriptionValid: serviceDescriptionValid,
        }, this.validateForm);
    }

    errorBorder(error) {
        return (error.length === 0 ? '' : "border border-danger");
    }

    clearForm = () => {
        this.setState({
            name: '',
            description: '',

            formErrors: {
                name: '',
                description: ''

            }
        });
    }

    render() {
        return (
            <div id="addService" className="modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4>Add New Service</h4>
                            <button type="button" id="service-modal-close" className="close" data-dismiss="modal" onClick={this.clearForm} > &times;</button>

                        </div>
                        <div className="modal-body col-lg-12">
                            <form id="ajax-addService-form" action="" value={this.state.value} method="post" autoComplete="off" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.name)}`}
                                        required="required"
                                        placeholder="Service Name"
                                        value={this.state.name}
                                        name="name"
                                        onChange={this.handleChange}
                                    />
                                    <div className="error-message"> {this.state.formErrors.name}</div>
                                </div>

                                <div className="form-group">
                                    <input type="text" className={`form-control ${this.errorBorder(this.state.formErrors.description)}`}
                                        required="required"
                                        placeholder="Description"
                                        name="description"
                                        onChange={this.handleChange}
                                        value={this.state.description} />
                                    <div className="error-message"> {this.state.formErrors.description}</div>
                                </div>
                                <button className="btn btn-secondary btn-block" disabled={!this.state.formValid}>
                                    Add New Service
                                </button>

                                <div className="error-message">{this.state.formErrors.infoMessage}</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(AddNewService);