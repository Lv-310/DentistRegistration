namespace DentistRegistration.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Web.Http;
    using System.Web.Http.Cors;
    using DentistRegistration.Models;

    [EnableCors(origins: "http://localhost:9090", headers: "*", methods: "*")]
    public class DoctorsController : ApiController
    {
        private DoctorsDataAccessLayer objdoctors = new DoctorsDataAccessLayer();
        // Tets comment
        // GET: api/Doctors
        public List<Doctor> GetData()
        {
            string text = "test";
            return objdoctors.GetAllDoctors().ToList();
        }
    }
}
