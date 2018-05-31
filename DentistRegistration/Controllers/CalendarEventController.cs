using DentistRegistration.DataAccessLayer;
using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class CalendarEventController : ApiController
    {
        private IRepositoryCRUcollection<CalendarEvent> repo;

        public CalendarEventController(IRepositoryCRUcollection<CalendarEvent> r)
        {
            repo = r;
        }

        // GET: api/CalendarEvent
        public List<CalendarEvent> GetAllEvents()
        {
            return repo.GetAll().ToList();
        }
        [HttpGet]
        public List<CalendarEvent> GetEventsByDoctorId(int id)
        {
            List<CalendarEvent> listEvents = repo.GetByTiedId(id).ToList();
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

                bool isAdded = repo.Insert(cEvent);
                if(isAdded)
                return Ok("Event is added");
                return BadRequest("Event is already booked");
            }
            catch (Exception)
            {
                return BadRequest(ModelState);
            }
        }
    }
}
