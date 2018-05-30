using DentistRegistration.DataAccessLayer;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class ToothController : ApiController
    {
        private ToothDAL toothDal = new ToothDAL();
        
        // GET: api/Tooth
        public IEnumerable<Tooth> Get(int id)
        {
            return toothDal.GetById(id);
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
                bool isAdded = toothDal.Insert(tooth);
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
                bool isUpdated = toothDal.Update(tooth);
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
