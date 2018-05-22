using DentistRegistration.DataAccessLayer;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class ServiceController : ApiController
    {
        private ServicesDataAccessLayer servDal = new ServicesDataAccessLayer();

        // GET: api/Service
        public IEnumerable<Service> Get()
        {
            return servDal.GetAllServices();
        }

        // GET: api/Service/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Service
        [HttpPost]
        public IHttpActionResult InsertService([FromBody]Service service)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool isAdded = servDal.InsertService(service);
                if (isAdded)
                {
                    return Ok("Service is added");
                }
                return BadRequest("Service already exist");
            }
            catch (Exception)
            {
                return BadRequest(ModelState);
            }
        }

        // PUT: api/Service/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Service/5
        public void Delete(int id)
        {
        }
    }
}
