using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DentistRegistration.Models
{
    public class XRay
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public string Link { get; set; }
        public DateTime Date { get; set; }
    }
}