﻿using DentistRegistration.Models;
using System;
using System.Web.Http;
using System.Web.Http.Cors;
using DentistRegistration.DataAccessLayer;

namespace TestDemo.Controllers
{
    [EnableCors(origins: "http://localhost:9090", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        LoginUserDataAccessLayer loginer = new LoginUserDataAccessLayer();

        [HttpPost]
        public IHttpActionResult Login([FromBody]LoginViewModel user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (loginer.Login(user))
                {
                    return Ok("Logined.");
                }

                return BadRequest("Invalid login or password");

            }

            catch (Exception)
            {
                return Ok("Something went wrong");
            }
        }

    }
}
