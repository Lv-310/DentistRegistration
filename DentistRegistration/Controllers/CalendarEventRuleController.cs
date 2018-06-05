using DentistRegistration.DataAccessLayer;
using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class CalendarEventRuleController : ApiController
    {
        private IRepositoryCRUD<CalendarEventRule> repo;

        public CalendarEventRuleController(IRepositoryCRUD<CalendarEventRule> r)
        {
            repo = r;
        }

        // GET: api/CalendarEventRule
        public List<CalendarEventRule> GetAllEvents()
        {
            return repo.GetAll().ToList();
        }

        [HttpDelete]
        public IHttpActionResult Delete([FromBody]CalendarEventRule rule)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool isDeleted = repo.Delete(rule.Id);

                if (isDeleted)
                {
                    return Ok("Rule is deleted");
                }
                return BadRequest("Error");
            }
            catch (Exception)
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]CalendarEventRule rule)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool isUpdated = repo.Update(rule);

                if (isUpdated)
                {
                    return Ok("Rule is updated");
                }
                return BadRequest("Error");
            }
            catch (Exception)
            {
                return BadRequest(ModelState);
            }
        }
    }
}
