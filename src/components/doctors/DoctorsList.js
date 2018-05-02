import React from 'react';
import ReactDOM from 'react-dom';
import './doctors.css';


class DoctorsList extends React.Component{
  constructor() {
    super();
    this.state = {
      'items': []
    }
  }
  componentDidMount(){
    this.getDoctors();
  }

  getDoctors(){
    fetch('http://localhost:9999/api/Doctors')
    .then(results => results.json())
    .then(results => this.setState({'items': results}));
  }
  render() {
    return (
      <div className="list-group">
      <a href="#" className="list-group-item active my-list-header">LIST DOCTORS</a>
        {this.state.items.map((item,index) => {
          return <button type="button" key={index} className="list-group-item list-group-item-action">
            {item.FirstName} {item.LastName}
            </button>
        }
        )}
      
      </div>
    );
  }
}

export default DoctorsList;





