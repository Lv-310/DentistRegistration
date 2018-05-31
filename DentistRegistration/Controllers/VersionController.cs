using DentistRegistration.DataAccessLayer;
using DentistRegistration.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class VersionController : ApiController
    {
        private IVersionDIService repo;

        public VersionController(IVersionDIService r)
        {
            repo = r;
        }
        // GET: api/Version
        public IEnumerable<string> Get()
        {
            return new string[] { repo.GetDatabaseVersion(), repo.GetBackEndVersion() };
        }

        public string Get(string version)
        {
            // todo: compare database version after it become available
            return version.Equals(repo.GetBackEndVersion()) ? "good" : "wrong version";
        }
    }
}
