using System;
using System.Web.Http;
using DentistRegistration.Models;

namespace DentistRegistration.Controllers
{
    public class UsersController : ApiController
    {
        InsertUsersDataAccessLayer insertUserLayer = new InsertUsersDataAccessLayer();

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
                return Ok("User added is " + isAdded);
            }
            catch (Exception)
            {
                return BadRequest(ModelState);
            }
        }
    }
}