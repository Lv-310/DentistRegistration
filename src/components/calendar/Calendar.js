import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import baseURL from '../../helpers/url';
import 'moment/locale/en-gb';
import $ from 'jquery';
import { ModalComponent } from 'react-modal';
import Toolbar from '../customtoolbar/Toolbar';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import { fetchFrom } from '../../helpers/fetcher';
import jwt_decode from 'jwt-decode';

//import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import { modalAlert, MSG_TYPE_INFO, MSG_TYPE_ERROR, MSG_TYPE_WARNING } from '../../helpers/modalAlert';
BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
  constructor() {
    super()
    this.state = {
      'allevents': [],
      selectedEvent: {},
      desc: "",
      responseError: {
        desc: "",
        wrongCredentials: ""
      },

      descValid: false,
      formValid: false,
      wrongCredentials: false
    }
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleDescription = (e) => {
    this.wrongCredentials = false;
        this.clearErrorMessage();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
    () => { this.validateField(name, value) });
  }

  BookEvent = (eventParams) => {
    fetchFrom('CalendarEvent', 'post', eventParams)
      .then((res) => {
        this.handleWrongBooking(res)
        return res.data;
      }
      ).then((res=>{
        this.getItems();
      }))
      if(this.state.wrongCredentials) return;
      alert("Event has been booked.");   
      document.getElementById('event-modal-close').click(); 
  }

  handleWrongBooking(event) {
    if (event.statusCode != 200) {
        this.state.wrongCredentials = true;
    }

    if (event.data.Message != undefined) {
        this.showErrorMessage(event.data.Message);
    }
   
}

showErrorMessage(message) {
    let errors = this.state.responseError;
    errors.wrongCredentials = this.state.wrongCredentials ? message : '';
    this.setState({ responseError: errors });
}

clearErrorMessage() {
    let errors = this.state.responseError;
    errors.wrongCredentials = '';
    this.setState({ responseError: errors });
}

  handleSubmit = (event) => {
    event.preventDefault()
    if(localStorage.getItem("token") === null)
    {
      modalAlert("You must be logged in","You must be registred user to perform this action",MSG_TYPE_ERROR);
      document.getElementById('event-modal-close').click(); 
      return;
    }
    var start = moment(this.state.selectedEvent.start);
    var end = moment(this.state.selectedEvent.end);
    const eventParams = {
      selectedEvent: {},

      desc: this.state.desc,
      userId: jwt_decode(localStorage.getItem("token")).Id,
      doctorId: this.props.match.params.doctorId,
      title: this.state.selectedEvent.title,
      start: moment(start).add(start.utcOffset(), 'm').utc(),
      end: moment(end).add(end.utcOffset(), 'm').utc(),
      hasBeenBooked: true
    }
    this.BookEvent(eventParams);
  }


  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.responseError;
    let descValid = this.state.descValid;


    switch (fieldName) {
        case 'desc':
        descValid = value.length > 0 && value.length <= 50;
            fieldValidationErrors.desc = descValid ? '' : 'Input incorrect description';
            break;
        default:
            break;
    }

    this.setState({
        responseErrors: fieldValidationErrors,
        descValid: descValid,
    }, this.validateForm);
}
validateForm() {
    this.setState({
        formValid:
            this.state.descValid
    });
}


  componentDidMount() {
    this.getItems();
  }

  getItems() {
    fetchFrom("RandomEvents/"+this.props.match.params.doctorId, "get", null)
      .then(results => {
        this.setState({ 'allevents': results.data })
      })
  }

  checkIfMobile() {
    if (isMobile)
      return ['day'];
    else return ['day', 'week', 'month'];

  }

  changeDefaultView() {
    if (isMobile)
      return "day";
    else return "week";
  }

  setStyle(event) {
    let newStyle = {
      backgroundColor: "seagreen",
      color: 'white',
      borderRadius: "0px",
      border: "none",
      zIndex: 11
    };

    if (event.hasBeenBooked) {
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
    var timeNow = t[0] + ':' + t[1];
    return timeNow;
  }


  onEventClick(event) {
    if(event.hasBeenBooked){
      modalAlert("Already booked","This event is already booked. Choose another one",MSG_TYPE_INFO);
      return;
      }
    if(localStorage.getItem("token") === null)
    {
      modalAlert("You must be logged in","You must be registred user to perform this action",MSG_TYPE_ERROR);
      document.getElementById('event-modal-close').click(); 
      return;
    }
    $("#Modalbtn").click();
    this.setState({ selectedEvent: event });
  }

  
  formatURLDate = (date) => {

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if(month < 10) month = '0' + month;
    if(day < 10) day = '0' + day;

    return `${year}-${month}-${day}`;
  }

  changeCurrentView = () => {
    if(isMobile){
      return 'day';
    }
    else {
      return this.props.match.params.view;
    } 
  }

  getCurrentDateFromURL = () => {
    var currentDate = new Date(new Date());
    if(this.props.match.params.date!==null && this.props.match.params.date!==undefined)
    currentDate = new Date(`${this.props.match.params.date}T00:00:01`);
    currentDate = new Date(currentDate)

    // alert(`${this.props.match.params.date}T00:00:01`);
   // alert(currentDate);
    return currentDate;
  }

  SetDate = (mydate) =>{
    alert(mydate[0]);
    return new Date(mydate[0],mydate[1],mydate[2]);
  }
  
  clearForm = () => {
    this.setState({
        desc: '',
    })}

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

    var currentView = this.changeCurrentView();

    return (
      <div>
        <div id="Modalbtn" data-toggle="modal" data-target="#EventModal">
        </div>
        <div id="EventModal" className="modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Make an appointment</h4>
                <button type="button" className="close" id="event-modal-close" data-dismiss="modal" onClick={this.clearForm}>&times;</button>
              </div>
              <div className="modal-body">
                <div className="modal-body col-sm-12">
                  <form id="ajax-event-form" action="" method="post" autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label>Date of an appointment</label>
                      <input type="text" className="form-control" value={this.formatDate(new Date(this.state.selectedEvent.start)) + " (" +
                        new Date(this.state.selectedEvent.start).toLocaleString('en-us', { weekday: 'long' }) + ")"} disabled />
                    </div>
                    <div className="form-group">
                      <label>Beginning of an appointment</label>
                      <input type="text" className="form-control" value={this.formatTime(String(this.state.selectedEvent.title))} disabled />
                    </div>
                    <div className="form-group">
                      <label>Input a purpose of an appointment</label>
                      <textarea type="text" className="form-control" name="desc" onChange={this.handleDescription} value={this.state.desc} required />
                      <div className="error-message">{this.state.responseError.desc}</div>
                    </div>
                    <button className="btn btn-secondary btn-block">
                      Confirm
                    </button>
                    <div className="error-message">{this.state.responseError.wrongCredentials} </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BigCalendar
          events={this.state.allevents}
          defaultView={currentView}
          scrollToTime={new Date(1970, 1, 1, 6)}
          date={this.getCurrentDateFromURL()}
          views={this.checkIfMobile()}
          min={new Date(2017, 10, 0, 8, 0, 0)}
          max={new Date(2017, 10, 0, 20, 0, 0)}
          onNavigate={date => this.props.history.push(`/Home/doctor/${this.props.match.params.doctorId}/${this.formatURLDate(date)}/${this.props.match.params.view}`)}
          onView={view => this.props.history.push(`/Home/doctor/${this.props.match.params.doctorId}/${this.props.match.params.date}/${view}`)}
          onSelectEvent={event => this.onEventClick(event)}
          components={{
            toolbar: Toolbar
          }}
          formats = {formats} 
          eventPropGetter={
            (event, start, end, isSelected) => {
              return {
                className: "",
                style: this.setStyle(event)
              };
            }
          } />
      </div>
    )
  }
}

export default withRouter(Calendar);
