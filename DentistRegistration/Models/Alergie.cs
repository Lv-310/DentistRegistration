using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DentistRegistration.Models
{
    public class Alergie
    {
        [StringLength(maximumLength: 100, ErrorMessage = "Description should be maximum 100 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string Name { get; set; }

        [Range(0, Int32.MaxValue)]
        [Required(ErrorMessage = "Field can't be empty")]
        public int Id { get; set; }
    }
}