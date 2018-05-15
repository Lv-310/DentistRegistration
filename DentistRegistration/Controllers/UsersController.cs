using System;
using System.Web.Http;
using DentistRegistration.DataAccessLayer;
using DentistRegistration.Models;

namespace DentistRegistration.Controllers
{
    public class UsersController : ApiController
    {
        private InsertUsersDataAccessLayer insertUserLayer = new InsertUsersDataAccessLayer();

        [HttpPost]
        public IHttpActionResult InsertUser([FromBody]User user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool isAdded = insertUserLayer.InsertUser(user);

                if (isAdded)
                {
                    return Ok("User added");
                }
                return BadRequest("Phone already registered");
            }
            catch (Exception)
            {
                return BadRequest(ModelState);
            }
        }
    }
}