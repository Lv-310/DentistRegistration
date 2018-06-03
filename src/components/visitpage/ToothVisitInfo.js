import React from 'react';
import ReactDOM from 'react-dom';
import { fetchFrom } from '../../helpers/fetcher';
import { Panel } from 'react-bootstrap';

class ToothVisitInfo extends React.Component{
    constructor() {
        super();
        this.state = {
          'services': []
        }
      }

      componentDidMount() {
        this.getServices();
      }
    
      getServices() {
        fetchFrom('Service', 'get', null)
          .then(results =>{this.setState({ 'services': results.data });
          return results;});
      }

     
      
    render(){
        return(
                <div className="row">
                    <div className="col-md-4">
                        <select className="form-control" id="sel1">
                            <option disabled selected value> -- select a service -- </option>
                                {this.state.services.map((item, index) => {
                                 return <option key={index}>{item.Name}</option>
                                }
                            )}
                        </select>
                    </div>
                </div>
        );
    }
} 

export default ToothVisitInfo;