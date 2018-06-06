import React from 'react';
import ReactDOM from 'react-dom';
import { fetchFrom } from '../../helpers/fetcher';
import { Panel } from 'react-bootstrap';

class ToothVisitInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            'services': [],
            service: 1,
            price: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getServices();
    }

    getServices() {
        fetchFrom('Service', 'get', null)
            .then(results => {
                this.setState({ 'services': results.data });
                return results;
            });
    }

    getCurrentPriceByService(id) {
        fetchFrom("Price/Service/" + id, 'get', null).
            then(results => {
                this.setState({ price: results.data });
            });
    }

    handleChange(event) {
        this.setState({ price: event.target.price });
    }

    handleSelectChange(event) {
        this.setState({service: event.target.value});
        this.getCurrentPriceByService(event.target.value);
    }
    
    handleSubmit(event) {
        alert('Hello, Andriy!');
        event.preventDefault();
      }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row mb-1">
                    <div className="col-md-4">
                        <select className="form-control" id="sel1" onChange={this.handleSelectChange}>
                            <option disabled selected value> -- select a service -- </option>
                            {this.state.services.map((item, index) => {
                                return <option value={item.Id} key={index}>{item.Name}</option>
                            }
                            )}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <input className="form-control" id="focusedInput" type="text" value={this.state.price} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-12">
                        <textarea type="text" className="form-control" name="desc" defaultValue="Description" />
                    </div>
                </div>
            </form>
        );
    }
}

export default ToothVisitInfo;