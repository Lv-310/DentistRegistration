import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import ReactDOM from 'react-dom';
import './adminservicelist.css';
import baseURL from '../../helpers/url';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchFrom } from '../../helpers/fetcher';
import { editPriceRequest } from './AllAdminRequest';
import { addPriceRequest } from './AllAdminRequest';
import { deletePriceRequest } from './AllAdminRequest';
import { MSG_TYPE_INFO, MSG_TYPE_WARNING, MSG_TYPE_ERROR, modalAlert, modalDialog, modalAlertClose, renderAlertBody } from '../../helpers/modalAlert';
import MomentLocaleUtils, { formatDate, parseDate, } from 'react-day-picker/moment';
import { isToday } from 'date-fns';




class AdminServiceList extends React.Component {
    constructor() {
        super();
        this.state = {
            'services': [],
            'prices': [],
            service: {},
            price: {},
            updatedPrice: '',
            newPrice: '',
            collapsedLast: 0,
            //datePrice: '',
            newStartDate: '',
            //startDate: moment(),

            formErrors: {
                price: '',
                infoMessage: '',
            },

            priceValid: false,
        }

    }

    deletePrice(id) {
        deletePriceRequest(id).then((response => {
            if (response.statusCode != 200) {
                var state = this.state;
                this.state.formErrors.infoMessage = response.data;
                this.setState(this.state);
                return;
            }
        }));
        this.getServicePrice(this.state.service.Id, this.state.service.Name);
        document.getElementById('price-modal-close').click();
    }


    handleEditSubmit = (event) => {
        event.preventDefault()

        const editedPriceData = {
            ServiceId: this.state.service.Id,
            Price: this.state.updatedPrice,
            Id: this.state.price.Id,
            DateStart: this.state.price.DateStart
        }
        editPriceRequest(editedPriceData).then((response => {
            if (response.statusCode != 200) {
                var state = this.state;
                this.state.formErrors.infoMessage = response.data;
                this.setState(this.state);
                return;

            }
            this.getServicePrice(this.state.service.Id, this.state.service.Name);
            document.getElementById('price-modal-close').click();

        }));
    }

    handleAddSubmit = (event) => {
        event.preventDefault()

        const addedPrice = {
            ServiceId: this.state.service.Id,
            Price: this.state.newPrice,
            DateStart: this.state.newStartDate
        }
        addPriceRequest(addedPrice).then((response => {
            if (response.statusCode != 200) {
                var state = this.state;
                this.state.formErrors.infoMessage = response.data.Message;
                this.setState(this.state);
                return;
            }
            document.getElementById('price-add-modal-close').click();
            this.getServicePrice(this.state.service.Id, this.state.service.Name);
        }));

    }

    componentDidMount() {
        this.getServices();
        this.changeCollapse();

    }

    getServices() {
        fetchFrom('Service', 'get', null)
            .then(results => this.setState({ 'services': results.data }));
    }

    getServicePrice(serviceId, serviceName) {
        fetchFrom('Price?id=' + serviceId, 'get', null)
            .then(results => this.setState({ 'prices': results.data }));
        var srvc = this.state.service;
        srvc.Name = serviceName;
        srvc.Id = serviceId;
        this.setState({ service: srvc });

        if (this.state.collapsedLast == serviceId) {
            this.state.collapsedLast = null;
            document.getElementById("price").className = "collapse";
        }
        else {
            document.getElementById("price").className = "collapse show";
            this.state.collapsedLast = serviceId;
        }

        var serviceDiv = document.getElementById("s-" + serviceId);
        var priceList = document.getElementById("price");
        serviceDiv.parentNode.insertBefore(priceList, serviceDiv.nextSibling);
    }

    handleChangeDate = (date) => {
        this.setState({ newStartDate: date });

    }

    formatDateStart = (date) => {
        var day = date.getDate();
        var monthIndex = date.getMonth() + 1;
        var year = date.getFullYear();

        return day + '-' + monthIndex + '-' + year;
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
                this.state.priceValid

        });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let priceValid = this.state.priceValid;

        switch (fieldName) {
            case 'newPrice':
                priceValid = value.match(/^[1-9][0-9]*$/) && value.length >= 0;
                fieldValidationErrors.price = priceValid ? '' : 'You input incorrect data, please try again';
                break;
            case 'updatedPrice':
                priceValid = value.match(/^[1-9][0-9]*$/) && value.length >= 0;
                fieldValidationErrors.price = priceValid ? '' : 'You input incorrect data, please try again';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            priceValid: priceValid,
        }, this.validateForm);
    }

    errorBorder(error) {
        return (error.length === 0 ? '' : "border border-danger");
    }

    changeCollapse() {
        if (isMobile)
            document.getElementById("service").className = "collapse";
        else document.getElementById("price").className = "collapse show";
    }


    addCurentPriceValues(currentPrice) {
        this.setState({ price: currentPrice })
    }

    clearForm = () => {
        this.setState({
            updatedPrice: '',
            newPrice: '',
            newStartDate: '',

            formErrors: {
                price: '',
                datePrice: ''

            }
        });
    }



    formatDate(date, format, locale) {
        return dateFnsFormat(date, format, { locale });
    }



    render() {
        var nowDateTime = new Date();
        nowDateTime.setDate(nowDateTime.getDate() - 1);
        var today = nowDateTime;
        const FORMAT = 'D-M-YYYY';

        return (
            <div className="list-group">
                <a href="#" data-toggle="collapse" data-target="#service" className="list-group-item active my-list-header btn-secondary dropdown-toggle-split">
                    Services
                    <i className="fas fa-sort-down" id="down-arrow"></i>
                </a>
                <div id="service" className="height-scroll">
                    {this.state.services.map((service, index) => {
                        return <div id={"s-" + service.Id} key={index}>
                            <a href="#" data-toggle="collapse" data-target="#s-" onClick={() => {
                                this.getServicePrice(service.Id, service.Name);
                            }}
                                key={index} className="list-group-item my-list-header active btn-info dropdown-toggle-split">{service.Name}
                                <i className="fas fa-sort-down" id="down-arrow"></i>
                            </a>
                        </div>
                    })}

                </div>

                <div id="price" className="collapse ">
                    {this.state.prices.map((price, index) => {
                        return <div key={index}>
                            <span type="button" key={index} className="list-group-item list-group-item-action" >
                                <span>{price.Price}</span>
                                <span className="mx-4"> {this.formatDateStart(new Date(price.DateStart))}</span>

                                {Date.parse(price.DateStart) >= today ?
                                    <a href="#" className="fas fa-edit float-right"
                                        onClick={() => { this.addCurentPriceValues(price); }} data-toggle="modal" data-target="#editPriceModal">
                                    </a> : null}

                                {Date.parse(price.DateStart) > new Date() ?
                                    <a href="#" id="fafadeleteMargin" className="fa fa-trash float-right"
                                        onClick={() => modalDialog(price.Price, "You are sure?", MSG_TYPE_WARNING, (id) => { this.deletePrice(id) }, price.Id)}>
                                    </a> : null}

                            </span>
                        </div>
                    })}
                    <a href="#" className={this.state.service.Id === undefined ? "list-group-item list-group-item-action d-none" : "list-group-item list-group-item-action"} data-toggle="modal" data-target="#addPriceModal">
                        <div className="fas fa-plus mr-2" />
                        Add New Price
                    </a>
                </div>

                <div id="editPriceModal" className="modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4>{this.state.service.Name}</h4>
                                <button onClick={this.clearForm} type="button" id="price-modal-close" className="close" data-dismiss="modal" > &times;</button>
                            </div>

                            <div className="modal-body col-lg-12">
                                <form id="ajax-editPrice-form" action="" method="post" autoComplete="off" onSubmit={this.handleEditSubmit}>
                                    <div className="form-group">
                                        <input className={`form-control ${this.errorBorder(this.state.formErrors.price)}`} type="text"
                                            required="required"
                                            placeholder={this.state.price.Price}
                                            name="updatedPrice"
                                            value={this.state.updatedPrice}
                                            onChange={this.handleChange}
                                        />
                                        <div className="error-message">{this.state.formErrors.price}</div>
                                    </div>
                                    <button className="btn btn-secondary btn-block" disabled={!this.state.formValid}>
                                        Save
                                    </button>
                                    <div className="error-message">{this.state.formErrors.infoMessage}</div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="addPriceModal" className="modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4>{this.state.service.Name}</h4>
                                <button onClick={this.clearForm} type="button" id="price-add-modal-close" className="close" data-dismiss="modal" > &times;</button>
                            </div>

                            <div className="modal-body col-lg-12">
                                <form id="ajax-addPriceRequest-form" action="" method="post" autoComplete="off" onSubmit={this.handleAddSubmit}>
                                    <div className="form-group">
                                        <label >{this.state.price.Name} </label>
                                        <input className={`form-control ${this.errorBorder(this.state.formErrors.price)}`} type="text"
                                            placeholder=""
                                            name="newPrice"
                                            value={this.state.newPrice}
                                            onChange={this.handleChange}
                                        />
                                        <div className="error-message">{this.state.formErrors.price}</div>
                                    </div>

                                    <div className="form-group">
                                        <DayPickerInput
                                            formatDate={formatDate}
                                            format={FORMAT}
                                            placeholder={FORMAT}
                                            inputProps={{ readOnly: true }}
                                            onDayChange={this.handleChangeDate}
                                        />
                                        {/* <a href='#' id="datePickerMargin" className="fa fa-calendar" data-toggle="collapse-show" data-target="DayPickerInput"
                                            onClick={() => {
                                                (document.getElementsByClassName('DayPickerInput')[0].firstChild.click())

                                                // document.getElementById('DayPickerInput').click();
                                            }}>
                                        </a> */}
                                    </div>

                                    <button className="btn btn-secondary btn-block" disabled={!this.state.priceValid}>
                                        Save
                                    </button>
                                    <div className="error-message">{this.state.formErrors.infoMessage}</div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AdminServiceList;