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

//import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
  constructor() {
    super()
    this.state = {
      'allevents': [],
      selectedEvent: {}
    }
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleDescription = (event) => {
    this.setState({ description: this.state.selectedEvent.description })

  }

  BookEvent = (eventParams) => {
    const body = JSON.stringify(eventParams)
    return fetch(`${baseURL}/CalendarEvent`, {
      method: 'post',
      body: body,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
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
      selectedEvent: {}
    }
    this.BookEvent(eventParams).then(console.log("hi"));

  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    fetch(`${baseURL}/RandomEvents/${this.props.match.params.doctorId}`)
      .then(results => results.json())
      .then(results => {
        // filter results by this.props.match.params.itemId
        this.setState({ 'allevents': results })
      });
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
      backgroundColor: "green",
      color: 'white',
      borderRadius: "0px",
      border: "none",
      zIndex: 11
    };

    if (event.hasBeenBooked) {
      newStyle.backgroundColor = "red"
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
    $("#Modalbtn").click();
    this.setState({ selectedEvent: event });
  }

  formatURLDate = (date) => {

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
  }

  render() {
    this.state.allevents.forEach(a => {
      a.start = new Date(a.start);
      a.end = new Date(a.end);
    })

    var x = window.matchMedia("(max-width: 700px)")

    var currentDate = new Date(this.props.match.params.date)

    return (
      <div>
        <div id="Modalbtn" data-toggle="modal" data-target="#EventModal">
        </div>
        <div id="EventModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Make an appointment {this.props.match.params.doctorId}</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <div className="modal-body col-sm-12">
                  <form id="ajax-login-form" action="" method="post" autoComplete="off" onSubmit={this.handleSubmit}>
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
                      <textarea type="text" className="form-control" onChange={this.handleDescription} value={this.state.selectedEvent.description} />
                    </div>
                    <button className="btn btn-secondary btn-block">
                      Visit hell
                            </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BigCalendar
          events={this.state.allevents}
          defaultView={this.props.match.params.view}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={currentDate}
          views={this.checkIfMobile()}
          min={new Date(2017, 10, 0, 8, 0, 0)}
          max={new Date(2017, 10, 0, 20, 0, 0)}
          onNavigate={date => this.props.history.push(`/doctor/${this.props.match.params.doctorId}/${this.formatURLDate(date)}/${this.props.match.params.view}`)}
          onView={view => this.props.history.push(`/doctor/${this.props.match.params.doctorId}/${this.props.match.params.date}/${view}`)}
          onSelectEvent={event => this.onEventClick(event)}
          components={{
            toolbar: Toolbar
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
      </div>
    )
  }
}

export default withRouter(Calendar);
