import React from 'react';
import ReactDOM from 'react-dom';
import { fetchFrom } from '../../helpers/fetcher';

import "./jaw.css"

class Jaw extends React.Component {
    constructor() {
        super();
        this.state = {
          'items': []
        }
    }


    info = (image) => {
       return alert(image);
    }

    componentDidMount() {
    this.getDoctors();
  }

  getDoctors() {
    fetchFrom('Doctors', 'get', null)
      .then(results =>{this.setState({ 'items': results.data }); return results;});
  }




    render() { 

        let arrayUpLeft = [1,2,3,4,5,6,7,8]
        let arrayUpRight = [9,10,11,12,13,14,15,16]
        let arrayDownLeft = [17,18,19,20,21,22,23,24]
        let arrayDownRight = [25,26,27,28,29,30,31,32]
        
        let imagesUpLeft = arrayUpLeft.map(image => {
            return <a onClick={() =>this.info(image)}>
                <img key={image} src={require(`./teeth/${image}.png`)} alt="" className="img-responsive" />
                </a>
        });

        let imagesUpRight = arrayUpRight.map(image => {
            return <a onClick={() =>this.info(image)}>
                <img key={image} src={require(`./teeth/${image}.png`)} alt="" className="img-responsive" />
                </a>
        });

         let imagesDownLeft = arrayDownLeft.map(image => {
            return <a onClick={() =>this.info(image)}>
                <img key={image} src={require(`./teeth/${image}.png`)} alt="" className="img-responsive" />
                </a>
        });

         let imagesDownRight = arrayDownRight.map(image => {
            return <a onClick={() =>this.info(image)}>
                <img key={image} src={require(`./teeth/${image}.png`)} alt="" className="img-responsive" />
                </a>
        });
        

      return (
        <div className="container"> 
            <div className="row">
                <div className="col-sm-6">
                    {imagesUpLeft}
                </div>
                <div className="col-sm-6">
                    {imagesUpRight}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    {imagesDownLeft}
                </div>
                <div className="col-sm-6">
                    {imagesDownRight}
                </div>
            </div>
        </div>
      )
    }
  }
  
  
  
  export default Jaw;