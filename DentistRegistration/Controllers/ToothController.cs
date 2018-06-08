using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class ToothController : ApiController
    {
        private IRepositoryCRUcollection<Tooth> repo;

        public ToothController(IRepositoryCRUcollection<Tooth> r)
        {
            repo = r;
        }

        // GET: api/Tooth
        public IEnumerable<Tooth> Get(int id)
        {
            return repo.GetByTiedId(id);
        }

        // POST: api/Price
        [HttpPost]
        [Route("api/Tooth/add")]
        public IHttpActionResult InsertTooth([FromBody]Tooth tooth)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                bool isAdded = repo.Insert(tooth);
                if (isAdded)
                {
                    return Ok("Inserted");
                }
                return BadRequest("Something went wrong");
            }
            catch (Exception e)
            {
                return BadRequest(ModelState);
            }
        }


        [HttpPost]
        [Route("api/Tooth/edit")]
        public IHttpActionResult EditTooth([FromBody]Tooth tooth)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                bool isUpdated = repo.Update(tooth);
                if (isUpdated)
                {
                    return Ok("Updated");
                }
                return BadRequest("Something went wrong");
            }
            catch (Exception e)
            {
                return BadRequest(ModelState);
            }
        }
    }
}
