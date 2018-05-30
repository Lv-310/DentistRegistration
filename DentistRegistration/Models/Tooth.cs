using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DentistRegistration.Models
{
    public class Tooth
    {
        public int Id { get; set; }
        public int ToothNumber { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
    }
}