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
            service: this.props.service,
            price: this.props.price,
            chars_left: 1024,
            toothId: this.props.toothId,
            description: this.props.desc,
            toothServices: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.optionselected = this.optionselected.bind(this);
    }

    componentDidMount() {
        this.getServices();
    }
    fireCallback() {

        this.props.callback(
            {
                Id: this.props.itemId,
                XrayId: 0,
                ServiceId: this.state.service,
                Price: this.state.price,
                ToothNum: this.props.toothId,
                Description: this.state.description,
                VisiId: 0
            }, this.props.itemId
        );
    }

    optionselected() {
        let name = '';
        if (this.state.service == 0) {
            return <option disabled selected value> select a service </option>
        }
        else {
            this.state.services.map((item, index) => {
                if (item.Id == this.props.service) {
                    name = item.Name
                }
                return;
            }
            )
            return <option disabled selected value>{name}</option>
        }
    }

    renderInfo() {
        return (
            <div className="div_toothinfo">
                <div className="row mb-1">
                    <div className="col-md-4">
                        <select className="form-control" onChange={this.handleSelectChange}>
                            {this.state.services.map((item, index) => {
                                return <option value={item.Id} key={index}>{item.Name}</option>
                            }
                            )}
                            {this.optionselected()}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <input className="form-control" id="focusedInput" type="number"
                            value={this.state.price} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-12">
                        <span class="textarea__count">Description {this.props.toothId}:
                            <span className="my-span">{1024 - this.state.chars_left}/1024</span></span>
                        <textarea maxLength="1024" required onChange={this.handleWordCount}
                            type="text" className="form-control" name="desc" defaultValue={this.state.description} />
                    </div>
                </div>
            </div>
        );
    }

    componentWillUpdate() {
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
        this.setState({ price: Number(event.target.value) });
    }

    handleSelectChange(event) {
        this.setState({ service: event.target.value });
        this.getCurrentPriceByService(event.target.value);
    }

    handleSubmit(event) {
        alert('Hello, Andriy!');
        event.preventDefault();
    }

    handleWordCount = event => {
        const charCount = event.target.value.length;
        const charLeft = 1024 - charCount;
        this.setState({ chars_left: charLeft });
        this.state.description = event.target.value;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInfo()}
            </form>
        );
    }
}

export default ToothVisitInfo;