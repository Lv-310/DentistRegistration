import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      'items': []
    }
  }
  componentDidMount(){
    this.getItems();
  }

  getItems(){
    fetch('http://localhost:63234/api/Message/GetMessage/')
    .then(results => results.json())
    .then(results => this.setState({'items': results}));
  }
  render() {
    return (
      <ul>
        {this.state.items.map(function(item) {
          <div>
          return <h1>{item.Msg}</h1>
          return <h1>{item.Msg}</h1>
          </div>
        }

        )}
      </ul>
    );
  }
}

export default App;
