using System.Collections.Generic;
using System.Web.Http;
using DentistRegistration.Models;

namespace DentistRegistration.Controllers
{
    public class MessageController : ApiController
    {
        [HttpGet]
        public List<Message> GetMessage()
        {
            List<Message> messageList = new List<Message>
            {
                new Message
                {
                    Msg = "Hello world",
                }
            };

            return messageList;
        }
    }
}
