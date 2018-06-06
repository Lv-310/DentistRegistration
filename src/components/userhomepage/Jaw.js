import React from 'react';
import ReactDOM from 'react-dom';
import { fetchFrom } from '../../helpers/fetcher';
import ToothVisitInfo from '../visitpage/ToothVisitInfo';
//import "./jaw.css"
import './NewJaw.css';

class Jaw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          'items': [],
          tooth : NaN,
          toothinfoComp: []
        }
        this.addItem = this.addItem.bind(this)
    }


    info = (tooth) => {
       this.setState({tooth : tooth})
      return tooth;  
    }
   
    addItem = () => {
        this.state.toothinfoComp.push(<ToothVisitInfo />)
        this.setState(
          this.state
        )
    }
   

    render() { 
        
        let arrayUp = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28]
        let arrayDown = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38]
        
        let imagesUp = arrayUp.map(image => {
            return <div data-toggle="collapse" data-target="#collapseExample" key={image} className={(`tooth-${image}`)} onClick={() =>this.info(image)}>
            </div>
        });

         let imagesDown = arrayDown.map(image => {
            return <div data-toggle="collapse" data-target="#collapseExample" key={image} className={(`tooth-${image}`)} onClick={() =>this.info(image)}>
                </div>
        });
        
      return (
        <div className="container"> 
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
                        <div class="card-header">
                            Selected Tooth visit info: {this.state.tooth}
                        </div>
                    <div className="card-body service-holder">
                    {this.state.toothinfoComp.map((item, index) => {
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