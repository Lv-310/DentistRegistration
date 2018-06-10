using DentistRegistration.Interfaces;
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

        public AvatarController (IAvatarUpload r)
        {
            repo = r;
        }

        [HttpPost]
        [Route("api/Avatar/edit")]
        public IHttpActionResult EditPrice([FromBody] string path, long phoneNum)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                
                bool isAdded = repo.Update(path, phoneNum);
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
