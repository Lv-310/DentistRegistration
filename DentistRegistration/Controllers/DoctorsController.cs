using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using DentistRegistration.DataAccessLayer;
using DentistRegistration.Models;

namespace DentistRegistration.Controllers
{
    public class DoctorsController : ApiController
    {
        private DoctorsDataAccessLayer objdoctors = new DoctorsDataAccessLayer();

        // GET: api/Doctors
        public List<Doctor> GetData()
        {
            return objdoctors.GetAllDoctors().ToList();
        }
    }
}
