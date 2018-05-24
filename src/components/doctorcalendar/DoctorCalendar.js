import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import baseURL from '../../helpers/url';
import 'moment/locale/en-gb';
import $ from 'jquery';
import {ModalComponent} from 'react-modal';
import Toolbar from '../customtoolbar/Toolbar';
import {isMobile} from 'react-device-detect';
import jwt_decode from 'jwt-decode';

//import 'react-big-calendar/lib/css/react-big-calendar.css';
import './doctorcalendar.css';
BigCalendar.momentLocalizer(moment);

class DoctorCalendar extends React.Component {
    constructor() {
      super()
      this.state = {
        'allevents': [],
        selectedEvent : {},
        doctorId: 0
      }
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    BookEvent=(eventParams) => {
      const body = JSON.stringify(eventParams)
      return fetch(`${baseURL}/CalendarEvent`, {
          method: 'post',
          body: body,
          headers: {
            "Content-Type":"application/json",
            "Accept":"application/json",
          }
        })
        .then((res) => {
          alert(res.status);
          return res;
        })
          .then((res) => {
            return res.json()
          } 
         ) 
    }

    handleSubmit = (event) => {
      event.preventDefault()

      const eventParams = {
        selectedEvent : {}
      }
      this.BookEvent(eventParams).then(console.log("hi"));
    
  }

    componentDidMount(){
      this.getItems();
    }
  
    getItems(){
      fetch(`${baseURL}/RandomEvents/${this.state.doctorId}`)
      .then(results => results.json())
      .then(results => {
        // filter results by this.props.match.params.itemId
        this.setState({'allevents': results})
      });
    }

    componentWillMount()
    {
        this.componentWillReceiveProps();
    }
    
    componentWillReceiveProps() {
        if (localStorage.getItem("token")!=null)
        {
            this.setState({doctorId:jwt_decode(localStorage.getItem("token")).Id});
        }
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
        backgroundColor: "seagreen",
        color: 'white',
        borderRadius: "0px",
        border: "none",
        zIndex : 11
      };

      if (event.hasBeenBooked){
        newStyle.backgroundColor = "crimson"
      }
      return newStyle;
    }
    
    formatDate = (date) => {
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
    
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
    
      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    formatTime = (time) => {
      var t = time.split(":");
      var timeNow = t[0]+':'+t[1];
      return timeNow;
    }

    
    onEventClick(event){
      if(!event.hasBeenBooked) return;
      $("#Modalbtn").click();
      this.setState({selectedEvent : event});
    }

    render() {
      this.state.allevents.forEach(a => {
        a.start = new Date(a.start);
        a.end = new Date(a.end);
      })   

      
      let formats = {
        dayFormat: (date, culture, localizer) =>
        
          localizer.format(date, 'ddd MM/dd', culture),
          eventTimeRangeFormat: ({ start, end }, culture, localizer) => {
            return ""
          },
      }
  

      var x = window.matchMedia("(max-width: 700px)")
      
      return ( 
    <div>
      <div id="Modalbtn" data-toggle="modal" data-target="#EventModal">
      </div>
        <div id="EventModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                      <h4>Check an appointment</h4>
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                  <div className="modal-body">
                  <div className="modal-body col-sm-12">
                        <form id="ajax-login-form" action="" method="post" autoComplete="off" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                              <label>Date of an appointment</label>
                                <input type="text" className="form-control" value={this.formatDate(new Date(this.state.selectedEvent.start))+" ("+
                                new Date(this.state.selectedEvent.start).toLocaleString('en-us', {  weekday: 'long' }) +")"}  disabled />  
                            </div>
                            <div className="form-group">
                            <label>Beginning of an appointment</label>
                                <input type="text" className="form-control" value={this.formatTime(String(this.state.selectedEvent.title))} disabled/>
                            </div>
                            <div className="form-group">
                            <label>Description of an appointment</label>
                                <textarea type="text" className="form-control" value={this.state.selectedEvent.desc} disabled/>
                            </div>
                        </form>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
          <BigCalendar
              events = {this.state.allevents}
              defaultView={this.changeDefaultView()}
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date(new Date())}
              views={this.checkIfMobile()}
              min={new Date(2017, 10, 0, 8, 0, 0)}
              max={new Date(2017, 10, 0, 20, 0, 0)} 
              onSelectEvent={event => this.onEventClick(event)}
              components={{
                toolbar : Toolbar
              }}
              formats = {formats} 
              eventPropGetter={
                (event, start, end, isSelected) => {
                  return {
                    className: "",
                    style: this.setStyle(event)
                  };
                }
              }
            />
            </div>
      )
    }
}

  export default DoctorCalendar;
