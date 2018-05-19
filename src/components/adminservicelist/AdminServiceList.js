import React from 'react';
import ReactDOM from 'react-dom';
import './adminservicelist.css';
import baseURL from '../../helpers/url';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchFrom } from '../../helpers/fetcher';



class AdminServiceList extends React.Component {
    constructor() {
        super();
        this.state = {
            'services': [],
            'prices': []
        }

    }
    componentDidMount() {
        this.getServices();
        this.changeCollapse();

    }

    getServices() {
        fetchFrom('Service', 'get', null)
            .then(results => this.setState({ 'services': results.data }));
    }

    GetServicePrice(serviceId) {
        fetchFrom('Price?id=' + serviceId, 'get', null)
            .then(results => this.setState({ 'prices': results.data }));

    }

    changeCollapse() {
        if (isMobile)
            document.getElementById("service").className = "collapse";
        else document.getElementById("price").className = "collapse show";
    }

    render() {
        return (
            <div className="list-group">
                {this.state.services.map((service, index) => {
                    return <div>
                        <a href="#" data-toggle="collapse" data-target="#service" onClick={() => this.GetServicePrice(service.Id)} key={index} className="list-group-item active my-list-header btn-secondary dropdown-toggle-split">
                            {service.Name}
                            <i className="fas fa-sort-down" id="down-arrow"></i>
                        </a>
                    </div>
                })}
                <div id="price" className="collapse show">
                    {this.state.prices.map((price, index) => {
                        return <div>
                            <button type="button" key={index} className="list-group-item list-group-item-action">
                                {price.Price}
                            </button>
                        </div>
                    }
                    )}
                </div>
            </div>

        );
    }
}
export default AdminServiceList;

