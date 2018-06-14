import React from 'react';
import ReactDOM from 'react-dom';
import { fetchFrom } from '../../helpers/fetcher';
import ToothVisitInfo from '../visitpage/ToothVisitInfo';
import SummaryInfo from '../visitpage/SummaryInfo';
//import "./jaw.css"
import './NewJaw.css';

class Jaw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            toothId: NaN,
            toothinfoComp: [],
            nextId: 0,
            activeTeeth: [],
            ifserviceadded: false,
            countAddedServices: 0,
        }
        this.addItem = this.addItem.bind(this)
        this.addServiceCallback = this.addServiceCallback.bind(this)
        this.gotoBottom = this.gotoBottom.bind(this)
        this.ToothVisitInfocontainer = this.ToothVisitInfocontainer.bind(this)
    }

    componentDidUpdate() {
        this.gotoBottom();
    }

    addServiceCallback(service, itemId) {
        this.setState(
            this.state
        )
        this.state.services[itemId] = service;

    }


    info = (toothId) => {
        if (this.state.ifserviceadded) {
            this.state.activeTeeth.push(this.state.toothId);
            this.setState({ ifserviceadded: false });

            for (let i = 0; i < this.state.countAddedServices; i++) {
                this.state.toothinfoComp.pop();
            }

            let obj = this;
            for (let i = this.state.services.length - this.state.countAddedServices; i < this.state.services.length; i++) {
                this.state.toothinfoComp.push(<ToothVisitInfo toothId={this.state.services[i].ToothNum}
                    desc={this.state.services[i].Description}
                    service={this.state.services[i].ServiceId}
                    price={this.state.services[i].Price}
                    toothServices={this.state.services}
                    callback={obj.addServiceCallback}
                    itemId={this.state.services[i].Id} />)
            }
        }
        this.setState({ toothId: toothId });
        return toothId;
    }

    addItem = () => {
        let obj = this;
        this.state.toothinfoComp.push(<ToothVisitInfo toothId={this.state.toothId}
            desc={''}
            service={0}
            price={0}
            toothServices={this.state.services}
            callback={obj.addServiceCallback} itemId={this.state.nextId} />)
        this.state.nextId++;
        this.setState(
            this.state
        )
        this.setState({ ifserviceadded: true });
        this.state.countAddedServices++;
    }

    sayhello = () => {
        alert(JSON.stringify(this.state.services));
        this.setState({ toothId: NaN })
    }

    gotoBottom = () => {
        var element = document.getElementById("service-holder");
        if (element.scrollHeight !== null) {
            element.scrollTop = element.scrollHeight
        };
    }

    ToothVisitInfocontainer() {
        let serviceArray = [];
        this.state.toothinfoComp.map((item, index) => {
            if (item.props.toothId === this.state.toothId) {
                serviceArray.push(<div key={index}>
                    {item}
                </div>)
            }
        })
        return serviceArray;
    }

    servicescontainer() {
        if (!isNaN(this.state.toothId)) {
            return (
                <div>
                    <div className="container">
                        <div className="card">
                            <div className="card-header">
                                Tooth name: {this.state.toothId}
                                <span className="my-span">
                                    <i onClick={this.addItem} className="fas fa-plus plus">  add service...</i>
                                </span>
                            </div>
                            <div className="card-body" id="service-holder">
                                {this.ToothVisitInfocontainer()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    teethClassNames(id) {
        if (id === this.state.toothId) {
            return (
                `tooth-${id} rounded activeTeeth`
            );
        }
        let active = false;
        this.state.activeTeeth.forEach((tooth) => {
            if (tooth === id) {
                active = true;
                return;
            }
        }
        );
        if (active) {
            return (
                `tooth-${id} someTeeth`
            );
        }
        return (
            `tooth-${id}`
        );
    }

    render() {

        let arrayUp = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
        let arrayDown = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

        let imagesUp = arrayUp.map(image => {
            return <div key={image} className={this.teethClassNames(image)} onClick={() => this.info(image)}>
            </div>
        });

        let imagesDown = arrayDown.map(image => {
            return <div key={image} className={this.teethClassNames(image)} onClick={() => this.info(image)}>
            </div>
        });

        return (
            <div className="container">
                <div className="row">
                    <SummaryInfo services={this.state.services} />
                </div>
                <div className="row">
                    <div className="upTeeth">
                        {imagesUp}
                    </div>
                </div>
                <div className="row">
                    <div className="downTeeth">
                        {imagesDown}
                    </div>
                </div>
                <button className="d-none" onClick={this.sayhello}>Hello Andriy</button>
                {this.servicescontainer()}
            </div>
        )
    }
}

export default Jaw;