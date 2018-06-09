import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { ModalComponent } from 'react-modal';

class SummaryInfo extends React.Component{ 
    constructor(props) {
        super(props)
        this.state = {
            SummaryPrice : 0,
            ServiceInfo : ""
        }
    }

    renderModal()
    {
        return(
        <div>
        <div id="Modalbtn" data-toggle="modal" data-target="#myModal">
            </div>
            <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h4>Visit summary info</h4>
                    <button type="button" className="close" id="myModal-modal-close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                    <div className="modal-body col-sm-12">
                    <form   autoComplete="off">
                    <div className="form-group">
                        <textarea type="text" value={this.state.ServiceInfo} className="form-control my_textarea" readOnly />
                        </div>
                        <button className="btn btn-secondary btn-block" data-dismiss="modal">
                        Close
                        </button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        );
  }


    getSummaryInfo = (services) => {
        let serviceInfo = "";
        for(var i = 0; i < services.length; i++) {
            serviceInfo += i+1+".\tService : "+ services[i].ServiceId +" Price : " + services[i].Price + "\nSummary: " + services[i].Description +'\n';
        } 
        return serviceInfo;
    }

    
    calculateSummaryPrice = (services) => {
      let sum = 0.0;
      for(var i = 0; i < services.length; i++) {
          sum += services[i].Price;
      } 
      return sum;
    }

    componentWillReceiveProps = () => {
        if (this.props.services !== undefined && this.props.services.length > 0)

        this.setState({
            SummaryPrice : this.calculateSummaryPrice(this.props.services),
            ServiceInfo: this.getSummaryInfo(this.props.services)
        })
    }

    render(){
        return(
            <div className = "container down-page">
            {this.renderModal()}
                <div className="row">
                    <div className="card border full-width">
                        <div className="card-header">
                        <h3>Summary visit info: </h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-4 bootstap-change-margin">
                                    <button type="button" className="btn btn-secondary btn-block btn-bootstrap" data-toggle="modal" data-target="#myModal">View summary info</button>
                                </div>
                                <div className="col-sm-4 bootstap-change-margin">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Price</span>
                                        </div>
                                        <input type="text" class="form-control" value = {this.state.SummaryPrice} aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="col-sm-4 bootstap-change-margin">
                                    <button type="button" className="btn btn-secondary btn-block">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        );
    }
}

export default SummaryInfo;