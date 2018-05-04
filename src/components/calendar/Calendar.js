import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import baseURL from '../../helpers/url';
import 'moment/locale/en-gb';

//import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
    constructor() {
      super()
      this.state = {
        'allevents': []
      }
    }
    componentDidMount(){
      this.getItems();
    }
  
    getItems(){
      fetch(`${baseURL}/RandomEvents`)
      .then(results => results.json())
      .then(results => this.setState({'allevents': results}));
      
    }

    setStyle(event) {
      let newStyle = {
        backgroundColor: "green",
        color: 'white',
        borderRadius: "0px",
        border: "none",
        zIndex : 11
      };

      if (event.hasBeenBooked){
        newStyle.backgroundColor = "red"
      }
      return newStyle;
    }
    
    render() {
      this.state.allevents.forEach(a => {
        a.start = new Date(a.start);
        a.end = new Date(a.end);
      })
      
      return (
          <BigCalendar
              events = {this.state.allevents}
              defaultView="week"
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date(new Date())}
              views={['day','week','month']}
              min={new Date(2017, 10, 0, 8, 0, 0)}
              max={new Date(2017, 10, 0, 20, 0, 0)} 
              onSelectEvent={event => alert(event.title)}
              
              eventPropGetter={
                (event, start, end, isSelected) => {
                  return {
                    className: "",
                    style: this.setStyle(event)
                  };
                }
              }
            />
      )
    }
}

  export default Calendar;
