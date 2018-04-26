using DentistRegistration.Models;
using DentistRegistration.Servises;
using System.Web.Http;


namespace DentistRegistration.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        /// <summary>
        /// Method for signing-in user
        /// </summary>
        /// <param name="model"></param>
        /// <returns>accessToken</returns>
        [HttpPost]
        [Route("sign-in")]
        public string SignIn([FromBody] User model)
        {
            var authServise = new AuthServise();

            //Test data FirstName = "Jack", .Password = "1111"
            if (model.FirstName == "Jack" && model.Password == "1111")
            {
                return authServise.GetAccessToken(model.FirstName, model.Password);
            }

            return null;
        }

        //for testing auth method
        [Authorize]
        [HttpGet]
        [Route("check")]
        public string CheckToken()
        {

            var str = "good";
            return str;
        }
    }
}
