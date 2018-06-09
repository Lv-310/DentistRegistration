import React from 'react';
import ReactDOM from 'react-dom';
import { fetchFrom } from '../../helpers/fetcher';
import { Panel } from 'react-bootstrap';

import './visitpage.css';

class ToothVisitInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'services': [],
            service: 0,
            price: 0,
            chars_left: 1024,
            toothId: 0,
            description: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getServices();
    }

    fireCallback()
    {
        this.props.callback(
            {
                Id:this.props.itemId,
                XrayId: 0,
                ServiceId: this.state.service,
                Price: this.state.price,
                ToothNum: this.props.toothId,
                Description: this.state.description,
                VisiId: 0 
            }, this.props.itemId
        );
    }
    componentWillUpdate(){
        this.fireCallback()
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

    handleWordCount = event => {
        const charCount = event.target.value.length;
        const charLeft = 1024 - charCount;
        this.setState({ chars_left: charLeft});
        this.state.description = event.target.value;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row mb-1">
                    <div className="col-md-4">
                        <select className="form-control" id="sel1" onChange={this.handleSelectChange}>
                            <option disabled selected value> select a service </option>
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
                        <span class="textarea__count">Description {this.props.toothId}: {1024-this.state.chars_left}/1024 characters left</span>
                        <textarea maxLength="1024" required onChange={this.handleWordCount} type="text" className="form-control" name="desc" />
                    </div>
                </div>
            </form>
        );
    }
}

export default ToothVisitInfo;