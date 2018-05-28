using DentistRegistration.DataAccessLayer;
using DentistRegistration.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class CalendarEventRuleController : ApiController
    {
        private CalendarEventRulesDAL eventRulesDAL = new CalendarEventRulesDAL();

        // GET: api/CalendarEventRule
        public List<CalendarEventRule> GetAllEvents()
        {
            return eventRulesDAL.GetAll().ToList();
        }
    }
}
