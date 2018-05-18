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
        private CalendarEventDAL eventsDAL = new CalendarEventDAL();

        // GET: api/CalendarEvent
        public List<CalendarEvent> GetAllEvents()
        {
            return eventsDAL.GetEvents().ToList();
        }
        [HttpGet]
        public List<CalendarEvent> GetEventsByDoctorId(int id)
        {
            List<CalendarEvent> listEvents = eventsDAL.GetEventsByDoctor(id).ToList();
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

                bool isAdded = eventsDAL.InsertEvent(cEvent);
                return Ok("Event is added");
            }
            catch (Exception e)
            {
                return BadRequest(ModelState);
            }
        }
    }
}
