using System;
using System.Web.Http;
using DentistRegistration.DataAccessLayer;
using DentistRegistration.Models;
using DentistRegistration.Servises;

namespace DentistRegistration.Controllers
{

    public class LoginController : ApiController
    {
        private LoginUserDataAccessLayer Login = new LoginUserDataAccessLayer();


        [HttpPost]
        public IHttpActionResult SignIn([FromBody]LoginViewModel user)
        {
            var authServise = new AuthServices();

            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var authorizedUser = Login.CheckLogin(user);

                if (authorizedUser == null)
                    return BadRequest("Invalid login or password");

                var token = authServise.GetAccessToken(authorizedUser);

                return Ok(new
                {
                    token
                });
            }
            catch (Exception)
            {
                return BadRequest("Something went wrong");
            }
        }
    }
}