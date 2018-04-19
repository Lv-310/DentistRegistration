﻿namespace TestDemo.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Web.Http;
    using System.Web.Http.Cors;
    using TestDemo.Models;

    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
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
