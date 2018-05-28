using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using DentistRegistration.DataAccessLayer;
using DentistRegistration.Interfaces;
using DentistRegistration.Models;

namespace DentistRegistration.Controllers
{
    public class DoctorsController : ApiController
    {
        private IRepositoryCRU<Doctor> repo;

        public DoctorsController(IRepositoryCRU<Doctor> r)
        {
            repo = r;
        }

        [HttpGet]
        public IEnumerable<Doctor> GetData()
        {
            return repo.GetAll().ToList();
        }

        [HttpGet]
        public Doctor GetDoctor(int id)
        {
            return repo.GetById(id);
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

                bool isAdded = repo.Insert(doctor);

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

                bool isUpdated = repo.Update(doctor);

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
