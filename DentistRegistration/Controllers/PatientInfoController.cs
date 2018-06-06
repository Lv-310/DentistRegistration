using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class PatientInfoController : ApiController
    {
        IRepositoryCRU<PatientInfo> repo;

        public PatientInfoController(IRepositoryCRU<PatientInfo> r)
        {
            repo = r;
        }

        // GET: api/PatientInfo/5
        public PatientInfo Get(int id)
        {
            return repo.GetById(id);
        }

        // POST: api/PatientInfo
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/PatientInfo/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/PatientInfo/5
        public void Delete(int id)
        {
        }
    }
}
