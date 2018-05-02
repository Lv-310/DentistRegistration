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
      <div>
      <p>List doctors: </p>
      <ul>
        {this.state.items.map((item,index) => {
          return <li key={index}>
            <a className="btn btn-secondary doctor-list">{item.FirstName} {item.LastName}</a>
            </li>
        }
        )}
      </ul>
      </div>
    );
  }
}

export default DoctorsList;





