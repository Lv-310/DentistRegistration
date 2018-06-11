using DentistRegistration.DataAccessLayer;
using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class XRayController : ApiController
    {
        [HttpPost]
        public IHttpActionResult InsertXRay ([FromBody]XRay XRay)
        {
            XRayDAL x_Ray = new XRayDAL();

            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                bool checkInsert = x_Ray.InsertXRay(XRay);

                if (checkInsert == false)
                    return BadRequest("Something went wrong");

                return Ok(new
                {
                    massage = "asda"
                });
            }
            catch (Exception e)
            {
                return BadRequest("Something went wrong");
            }
        }
    }
}
