using System;
using System.Web.Http;
using DentistRegistration.DataAccessLayer;
using DentistRegistration.Models;
using DentistRegistration.Servises;

namespace DentistRegistration.Controllers
{

<<<<<<<<< Temporary merge branch 1
=========
    
>>>>>>>>> Temporary merge branch 2
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

                var res = Login.Login(user);

                if (!res)
                    return BadRequest("Invalid login or password");

                var token = authServise.GetAccessToken(user.PhoneNum.ToString());

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