using DentistRegistration.DataAccessLayer;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class CalendarEventController : ApiController
    {
        private CalendarEventsDAL eventsDAL = new CalendarEventsDAL();

        // GET: api/CalendarEvent
        public List<CalendarEvent> GetAllEvents()
        {
            return eventsDAL.GetAll().ToList();
        }
        [HttpGet]
        public List<CalendarEvent> GetEventsByDoctorId(int id)
        {
            List<CalendarEvent> listEvents = eventsDAL.GetById(id).ToList();
            return listEvents;
        }


        // Post: api/CalendarEvent
        [HttpPost]
        public IHttpActionResult InsertEvent([FromBody]CalendarEvent cEvent)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool isAdded = eventsDAL.Insert(cEvent);
                return Ok("Event is added");
            }
            catch (Exception)
            {
                return BadRequest(ModelState);
            }
        }
    }
}
