﻿using System;
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
        public IEnumerable<Doctor> GetData()
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
            catch (Exception e)
            {
                return BadRequest("Something went wrong");
            }
        }

        [HttpPut]
        public IHttpActionResult UpdateDoctor(int id, [FromBody]Doctor doctor)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool isUpdated = objdoctors.UpdateDoctor(doctor);

                if (isUpdated)
                {
                    return Ok("Doctor updated");
                }

                return BadRequest();
            }
            catch (Exception)
            {
                return BadRequest(ModelState);
            }
        }
    }
}
