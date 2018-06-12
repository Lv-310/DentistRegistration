using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class AvatarController : ApiController
    {
         IAvatarUpload repo;

        public AvatarController() { }

        public AvatarController (IAvatarUpload r)
        {
            repo = r;
        }

        [HttpPost]
        public IHttpActionResult EditAvatar([FromBody]AvatarViewModel avatar)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                
                bool isAdded = repo.Update(avatar);
                if (isAdded)
                {
                    return Ok("Avatar added");
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
