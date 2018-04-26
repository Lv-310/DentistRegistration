using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using TestDemo.Models;

namespace TestDemo.Controllers
{
    [EnableCors(origins: "http://localhost:9090", headers: "*", methods: "*")]
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
                return Ok("Something went wrong");
            }
        }
    }
}
