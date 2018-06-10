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
          toothId : NaN,
          toothinfoComp: [],
          nextId:0,
        }
        this.addItem = this.addItem.bind(this)
        this.addServiceCallback = this.addServiceCallback.bind(this)
        this.gotoBottom = this.gotoBottom.bind(this)
    }
    
    componentDidUpdate() {
        this.gotoBottom();
    }

    addServiceCallback(service, itemId)
    {
        this.setState(
            this.state
        )
        this.state.services[itemId]=service;
        
    }


    info = (toothId) => {
       this.setState({toothId : toothId})
      return toothId;  
    }
   
    addItem = () => {
 
        let obj = this;
        this.state.toothinfoComp.push(<ToothVisitInfo toothId={this.state.toothId}
            callback={obj.addServiceCallback} itemId = {this.state.nextId}/>)
        this.state.nextId++;
        this.setState(
            this.state
        )
        //alert(JSON.stringify(this.state.services));

    }

    gotoBottom = () => {
        var element = document.getElementById("service-holder");
        if(element.scrollHeight!==null){
            element.scrollTop = element.scrollHeight};
    }

    render() { 
        
        let arrayUp = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28]
        let arrayDown = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38]
        
        let imagesUp = arrayUp.map(image => {
            return <div data-toggle="collapse" data-target="#collapseExample" key={image} className={(image==this.state.toothId?`tooth-${image} rounded activeTeeth`:`tooth-${image}`)} onClick={() =>this.info(image)}>
            </div>
        });

         let imagesDown = arrayDown.map(image => {
            return <div data-toggle="collapse" data-target="#collapseExample" key={image} className={(image==this.state.toothId?`tooth-${image} rounded activeTeeth`:`tooth-${image}`)} onClick={() =>this.info(image)}>
                </div>
        });
        
      return (
            <div className="container">
                <div className="row">
                    <SummaryInfo services = {this.state.services} />
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
              <div className="collapse" id="collapseExample">
                  <div className="container">
                      <div className="card">
                          <div className="card-header">
                              Tooth name: {this.state.toothId}
                          </div>
                          <div className="card-body" id="service-holder">
                              {this.state.toothinfoComp.map((item, index) => {
                                  if (item.props.toothId === this.state.toothId)
                                      return <div key={index}>
                                          {item}
                                      </div>
                              }
                              )}
                              <i onClick={this.addItem} className="fas fa-plus plus">  add service...</i>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
    }
  }

  
  
  
  
  export default Jaw;