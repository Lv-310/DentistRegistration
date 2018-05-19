using System;
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

       
        [HttpGet]
        public List<Doctor> GetData()
        {
            return objdoctors.GetAllDoctors().ToList();
        }

        [HttpGet]
        public Doctor GetDoctor(int id)
        {
            return objdoctors.GetDoctorById(id);
        }

        [HttpPost]
        public IHttpActionResult InsertDoctor([FromBody]Doctor doctor)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool isAdded = objdoctors.InsertDoctor(doctor);

                if (isAdded)
                {
                    return Ok("Doctor added");
                }
                return BadRequest("Phone already registered");
            }
            catch (Exception)
            {
                return BadRequest(ModelState);
            }
        }

    }
}
