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
        
        let arrayUpLeft = [18,17,16,15,14,13,12,11]
        let arrayUpRight = [21,22,23,24,25,26,27,28]
        let arrayDownRight = [31,32,33,34,35,36,37,38]
        let arrayDownLeft = [48,47,46,45,44,43,42,41]
        
        let imagesUpLeft = arrayUpLeft.map(image => {
            return <div data-toggle="collapse" data-target="#collapseExample" key={image} className={(`tooth-${image}`)} onClick={() =>this.info(image)}>
            </div>
        });

        let imagesUpRight = arrayUpRight.map(image => {
            return <div data-toggle="collapse" data-target="#collapseExample" key={image} className={(`tooth-${image}`)} onClick={() =>this.info(image)}>
            </div> 
        });

         let imagesDownLeft = arrayDownLeft.map(image => {
            return <div data-toggle="collapse" data-target="#collapseExample" key={image} className={(`tooth-${image}`)} onClick={() =>this.info(image)}>
                </div>
        });

         let imagesDownRight = arrayDownRight.map(image => {
            return <div  key={image} className={(`tooth-${image}`)} onClick={() =>this.info(image)}>
            </div>
        });

       
        
        
      return (
        <div className="container"> 
            <div className="row">
                <div className="col-sm-6 upTeeth">
                    {imagesUpLeft}
                </div>
                <div className="col-sm-6 upTeeth">
                    {imagesUpRight}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 downTeeth">
                    {imagesDownLeft}
                </div>
                <div className="col-sm-6 downTeeth">
                    {imagesDownRight}
                </div>
            </div>
            <div className="collapse" id="collapseExample">
                <div className="container">
                    <div className="card">
                        <div class="card-header">
                            Selected Tooth visit info: {this.state.tooth}
                        <i onClick={this.addItem}    class="fas fa-plus"></i>
                        </div>
                    <div className="card-body">
                    {this.state.toothinfoComp.map((item, index) => {
                        return <div key={index}>
                            {item}
                        </div>
                    }
                    )}
                </div>
            </div>
            </div> 
            </div>         
        </div>
      )
    }
  }

  
  
  
  
  export default Jaw;