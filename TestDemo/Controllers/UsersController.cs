﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using TestDemo.Models;

namespace TestDemo.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
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
                insertUserLayer.InsertUser(user);
                return Ok("User added.");
            }
            catch (Exception)
            {
                return Ok("Something went wrong");
            }
        }
    }
}
