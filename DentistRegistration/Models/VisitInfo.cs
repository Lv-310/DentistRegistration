using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DentistRegistration.Models
{
    public class VisitInfo
    {
        [Range(0, Int32.MaxValue)]
        [Required(ErrorMessage = "Field can't be empty")]
        public int Id { get; set; }

        [Range(0, Int32.MaxValue)]
        [Required(ErrorMessage = "Field can't be empty")]
        public int EventId { get; set; }

        [Range(0, Int32.MaxValue)]
        [Required(ErrorMessage = "Field can't be empty")]
        public int PriceSum { get; set; }

        [Required(ErrorMessage = "Field can't be empty")]
        public VisitService[] Services { get; set; }

    }
}