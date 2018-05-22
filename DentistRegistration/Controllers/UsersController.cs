using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using DentistRegistration.DataAccessLayer;
using DentistRegistration.Models;

namespace DentistRegistration.Controllers
{
    public class UsersController : ApiController
    {
        private InsertUsersDataAccessLayer UserLayer = new InsertUsersDataAccessLayer();

        [HttpGet]
        public List<User> GetUsers()
        {
            return UserLayer.GetAllUsers().ToList();
        }

        [HttpGet]
        public User GetUser(int id)
        {
            return UserLayer.GetUserById(id);
        }

        [HttpPost]
        public IHttpActionResult InsertUser([FromBody]User user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool isAdded = UserLayer.InsertUser(user);

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