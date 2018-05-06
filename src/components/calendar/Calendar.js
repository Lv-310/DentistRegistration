import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import baseURL from '../../helpers/url';
import 'moment/locale/en-gb';
import Toolbar from '../customtoolbar/Toolbar';
import {isMobile} from 'react-device-detect';

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

    checkIfMobile(){
      if(isMobile)
      return ['day'];
      else return ['day','week','month'];
    }

    changeDefaultView(){
      if(isMobile)
      return "day";
      else return "week";
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

      var x = window.matchMedia("(max-width: 700px)")
      
      return (
          <BigCalendar
              events = {this.state.allevents}
              defaultView={this.changeDefaultView()}
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date(new Date())}
              views={this.checkIfMobile()}
              min={new Date(2017, 10, 0, 8, 0, 0)}
              max={new Date(2017, 10, 0, 20, 0, 0)} 
              onSelectEvent={event => alert(event.title)}
              components={{
                toolbar : Toolbar
              }}
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
