using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DentistRegistration.Interfaces
{
    public interface IVersionDIService
    {
        string GetDatabaseVersion();
        string GetBackEndVersion();
    }
}