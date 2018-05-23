import React from 'react';
import ReactDOM from 'react-dom';
import './adminservicelist.css';
import baseURL from '../../helpers/url';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchFrom } from '../../helpers/fetcher';
import { savePrice } from './EditPriceService';




class AdminServiceList extends React.Component {
    constructor() {
        super();
        this.state = {
            'services': [],
            'prices': [],
            service: {},
            price: {},
            updatedPrice: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const EditedPriceData = {
            ServiceId: this.state.service.Id,
            Price: this.state.updatedPrice,
            Id: this.state.price

        }
        savePrice(EditedPriceData)
    }


    componentDidMount() {
        this.getServices();
        this.changeCollapse();

    }


    getServices() {
        fetchFrom('Service', 'get', null)
            .then(results => this.setState({ 'services': results.data }));
    }

    GetServicePrice(serviceId, serviceName) {
        fetchFrom('Price?id=' + serviceId, 'get', null)
            .then(results => this.setState({ 'prices': results.data }));
        this.state.service.Name = serviceName;
        this.state.service.Id = serviceId;
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
    }

    changeCollapse() {
        if (isMobile)
            document.getElementById("service").className = "collapse";
        else document.getElementById("price").className = "collapse show";
    }

    addCurentPriceValues(pricePrice) {
        this.setState({ price: { Price: pricePrice } });
    }

    render() {
        return (

            <div className="list-group">
                {this.state.services.map((service, index) => {
                    return <div>
                        <a href="#" data-toggle="collapse" data-target="#service" onClick={() => this.GetServicePrice(service.Id, service.Name)}
                            key={index} className="list-group-item active my-list-header btn-secondary dropdown-toggle-split">{service.Name}
                            <i className="fas fa-sort-down" id="down-arrow"></i>
                        </a>
                    </div>
                })}

                <div id="price" className="collapse show">
                    {this.state.prices.map((price, index) => {
                        return <div>
                            <span type="button" key={index} className="list-group-item list-group-item-action" >
                                {price.Price}
                                <a href="#" className="fas fa-edit float-right"
                                    onClick={() => this.addCurentPriceValues(price.Price)} data-toggle="modal" data-target="#editPriceModal"></a>
                            </span>
                        </div>
                    }
                    )}
                </div>

                <div id="editPriceModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4>{this.state.service.Name}</h4>
                                <button type="button" id="login-modal-close" className="close" data-dismiss="modal" > &times;</button>
                            </div>

                            <div className="modal-body col-lg-12">
                                <form id="ajax-editPrice-form" action="" method="post" autoComplete="off" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label >{this.state.price.Id} </label>
                                        <input className="form-control" type="text" required="required"
                                            placeholder={this.state.price.Price} name="updatedPrice"
                                            onChange={this.handleChange} />

                                        <div className="error-message"></div>

                                    </div>
                                    <button className="btn btn-secondary btn-block">
                                        Save
                                    </button>
                                    <div className="error-message"></div>
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

