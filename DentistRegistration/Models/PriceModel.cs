using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DentistRegistration.Models
{
    public class PriceModel
    {
        public int Id { get; set; }

        public int Price { get; set; }

        public DateTime DateStart { get; set; }

        public int ServiceId { get; set; }
    }
}