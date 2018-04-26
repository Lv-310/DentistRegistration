using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using DentistRegistration.Models;

namespace DentistRegistration.Controllers
{
    [EnableCors(origins: "http://localhost:9090", headers: "*", methods: "*")]
    public class MessageController : ApiController
    {
        [HttpGet]
        public List<Message> GetMessage()
        {
            List<Message> messageList = new List<Message>();

            messageList.Add(new Message
            {
                Msg = "Hello world",
            });

            return messageList;
        }
    }
}
