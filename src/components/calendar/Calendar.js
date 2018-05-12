import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import baseURL from '../../helpers/url';
import 'moment/locale/en-gb';
import $ from 'jquery';
import {ModalComponent} from 'react-modal';

//import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
    constructor() {
      super()
      this.state = {
        'allevents': []
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    loginUser=(loginParams) => {
      const body = JSON.stringify(loginParams)
      return fetch(`${baseURL}/Login`, {
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

      const loginParams = {

      }
      //loginUser(loginParams);
    
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
    
    onEventClick(event){
      $("#Modalbtn").click();

    }

  

    render() {
      this.state.allevents.forEach(a => {
        a.start = new Date(a.start);
        a.end = new Date(a.end);
      })
      
      return (
    <div>
      <div id="Modalbtn" data-toggle="modal" data-target="#EventModal">
      </div>
        <div id="EventModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">


                    <div className="modal-header">
                      <h4>Make an appointment</h4>
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                  <div className="modal-body">
                  <div className="modal-body col-sm-12">
                        <form id="ajax-login-form" action="" method="post" autoComplete="off" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.allevents} disabled />
                                <div className="error-message"></div>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control"/>
                                <div className="error-message"></div>
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
              events = {this.state.allevents}
              defaultView="week"
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date(new Date())}
              views={['day','week','month']}
              min={new Date(2017, 10, 0, 8, 0, 0)}
              max={new Date(2017, 10, 0, 20, 0, 0)} 
              onSelectEvent={(event) => {this.onEventClick(event)}}
              
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

  export default Calendar;
