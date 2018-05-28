using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using DentistRegistration.DataAccessLayer;
using DentistRegistration.Interfaces;
using DentistRegistration.Models;

namespace DentistRegistration.Controllers
{
    public class UsersController : ApiController
    {
        IRepositoryCRU<User> repo;

        public UsersController(IRepositoryCRU<User> r)
        {
            repo = r;
        }

        [HttpGet]
        public List<User> GetUsers()
        {
            return repo.GetAll().ToList();
        }

        [HttpGet]
        public User GetUser(int id)
        {
            return repo.GetById(id);
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

                bool isAdded = repo.Insert(user);

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