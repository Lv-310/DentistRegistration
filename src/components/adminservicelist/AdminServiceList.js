import React from 'react';
import ReactDOM from 'react-dom';
import './adminservicelist.css';
import baseURL from '../../helpers/url';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchFrom } from '../../helpers/fetcher';
import { savePrice } from './EditPriceService';
import { addPrice } from './EditPriceService';


class AdminServiceList extends React.Component {
    constructor() {
        super();
        this.state = {
            'services': [],
            'prices': [],
            service: {},
            price: {},
            updatedPrice: '',
            datePrice: '',
            add: '',

            formErrors: {
                price: '',
                datePrice: ''
            },

            priceValid: false,
            datePriceValid: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault()
        var EditedPriceData = {
            ServiceId: this.state.service.Id,
            Price: this.state.updatedPrice,
            Id: this.state.price.Id,
            DateStart: this.state.datePrice

        };
        if(this.state.add==='')
        {
            EditedPriceData.DateStart=this.state.price.DateStart;
        savePrice(EditedPriceData).then((item => {
            if (item.statusCode != 200) {
                var state = this.state;
                state.formErrors.userExist = item.data.Message;
                this.setState(state);             
                return;
            }
            document.getElementById('price-modal-close').click();
            this.getServicePrice(this.state.service.Id,this.state.service.Name);
        }))}
        else
        {
            addPrice(EditedPriceData).then((item => {
                if (item.statusCode != 200) {
                    var state = this.state;
                    state.formErrors.userExist = item.data.Message;
                    this.setState(state);
                    return;
                }
                document.getElementById('price-modal-close').click();
                this.getServicePrice(this.state.service.Id,this.state.service.Name);
        }))
        };
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
        this.setState({service:srvc});
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });

        this.setState({ updatedPrice: value },
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
        let datePriceValid = this.state.datePriceValid;

        switch (fieldName) {
            case 'updatedPrice':
                priceValid = value.match(/^[1-9][0-9]*$/) && value.length >= 0;
                fieldValidationErrors.price = priceValid ? '' : 'You input incorrect data, please try again';
                break;
            case 'datePrice':
                datePriceValid = value.length > 0;
                fieldValidationErrors.datePrice = datePriceValid ? '' : 'You input incorrect data, please try again';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            priceValid: priceValid,
            datePriceValid: datePriceValid
        }, this.validateForm);
    }

    errorBorder(error) {
        return (error.length === 0 ? '' : "border border-danger");
    }

    clearForm = () => {
        this.setState({
            updatedPrice: '',
            formErrors: {
                price: '',
                datePrice: ''

            }
        });
    }


    changeCollapse() {
        if (isMobile)
            document.getElementById("service").className = "collapse";
        else document.getElementById("price").className = "collapse show";
    }


    addCurentPriceValues(currentPrice) {
        this.setState({ price: currentPrice });
    }

    addCurentPriceDate(currentDatePrice) {
        this.setState({ datePrice: currentDatePrice });
    }

    updatedInputValue = (evt) => {
        this.setState({
            updatedPrice: evt.target.value
        });
    }

    updatedInputDate = (evt) => {
        this.setState({
            datePrice: evt.target.value
        });
    }

    formatDate = (date) => {

        var day = date.getDate();
        var monthIndex = date.getMonth() + 1;
        var year = date.getFullYear();

        return day + '-' + monthIndex + '-' + year;
    }


    render() {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        var today = d;
        return (

            <div className="list-group">
                 <a href="#" data-toggle="collapse" data-target="#demo3"  className="list-group-item active my-list-header btn-secondary dropdown-toggle-split" id="first1">
                    Services
                    <i className="fas fa-sort-down" id="down-arrow"></i>
                    </a>
                <div id="demo3" className="height-scroll collapse show">
                {this.state.services.map((service, index) => {
                    return <div>
                        <a href="#" data-toggle="collapse" data-target="#service" onClick={() => {this.getServicePrice(service.Id, service.Name);
                        }}
                            key={index} className="list-group-item list-group-item-action dropdown-toggle-split">{service.Name}
                        </a>
                    </div>
                })}
                </div>

                <div id="price" className="collapse show">
                    {this.state.prices.map((price, index) => {
                        return <div>

                            <span type="button" key={index} className="list-group-item list-group-item-action" >
                                <span>{price.Price}</span>
                                <span className="mx-4"> {this.formatDate(new Date(price.DateStart))}</span>
                                {Date.parse(price.DateStart)>=today?
                                <a href="#" className="fas fa-edit float-right"
                                    onClick={() =>{ this.addCurentPriceValues(price);this.setState({add:''})}} data-toggle="modal" data-target="#editPriceModal">
                                </a>:null}
                            </span>
                        </div>
                    }
                    )} 
                    {this.state.service.Id>0?
                    <a href="#" className="list-group-item list-group-item-action" data-toggle="modal" data-target="#editPriceModal"
                    onClick={() =>{ this.setState({add:'yes',price:{}});}}>
                    <div className="fas fa-plus mr-2" />
                    Add new
                    </a>:null}
                </div>

                <div id="editPriceModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4>{this.state.service.Name}</h4>
                                <button onClick={this.clearForm} type="button" id="price-modal-close" className="close" data-dismiss="modal" > &times;</button>
                            </div>

                            <div className="modal-body col-lg-12">
                                <form id="ajax-editPrice-form" action="" method="post" autoComplete="off" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label >{this.state.price.Name} </label>
                                        <input className={`form-control ${this.errorBorder(this.state.formErrors.price)}`} input type="text"
                                            placeholder={this.state.price.Price} name="updatedPrice"
                                            value={this.state.updatedPrice}
                                            onChange={this.handleChange}
                                        />
                                        <div className="error-message">{this.state.formErrors.price}</div>

                                    </div>
                                    {this.state.add!=''?
                                    <div className="form-group">
                                        <input className="form-control" type="date" id="price-date"
                                            placeholder={this.state.price.DateStart} name="datePrice"
                                            value={this.state.datePrice}
                                            onChange={this.updatedInputDate}
                                        />
                                        <div className="error-message">{this.state.formErrors.datePrice}</div>
                                    </div>:null
                                    }
                                    <button className="btn btn-secondary btn-block" disabled={!this.state.formValid}>
                                        Save
                                    </button>
                                    <div className="error-message">{this.state.formErrors.userExist}</div>
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

