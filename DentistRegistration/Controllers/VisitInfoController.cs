using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class VisitInfoController : ApiController
    {
        private IRepositoryCRU<VisitInfo> repo;

        public VisitInfoController(IRepositoryCRU<VisitInfo> r)
        {
            repo = r;
        }

        [HttpPost]
        public IHttpActionResult InsertVisitInfo([FromBody]VisitInfo visitInfo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool isAdded = repo.Insert(visitInfo);

                if (isAdded)
                {
                    return Ok("Visit information added");
                }
                return BadRequest("Error during visit inserting");
            }
            catch (Exception e)
            {
                return BadRequest("Something went wrong");
            }
        }
    }
}
