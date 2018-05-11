using DentistRegistration.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class VersionController : ApiController
    {
        private VersionDataAccessLayer versions = new VersionDataAccessLayer();
        // GET: api/Version
        public IEnumerable<string> Get()
        {
            return new string[]{ versions.GetDatabaseVersion() , versions.GetBackEndVersion()};
        }

        public string Get(string version)
        {
            // todo: compare database version after it become available
            return version.Equals(versions.GetBackEndVersion()) ? "good" : "wrong version";
        }
    }
}
