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
            var authServise = new AuthServise();

            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var LoginnedUser = Login.CheckLogin(user);

                if (LoginnedUser == null)
                    return BadRequest("Invalid login or password");

                var token = authServise.GetAccessToken(user.PhoneNum.ToString());

                return Ok(new
                {
                    LoginnedUser,
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
