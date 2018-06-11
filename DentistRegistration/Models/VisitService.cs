using System;
using System.ComponentModel.DataAnnotations;

namespace DentistRegistration.Models
{
    public class VisitService
    {
        [Range(0, Int32.MaxValue)]
        [Required(ErrorMessage = "Field can't be empty")]
        public int id { get; set; }

        [Range(0, Int32.MaxValue)]
        [Required(ErrorMessage = "Field can't be empty")]
        public int VisitId { get; set; }

        [Range(0,Int32.MaxValue)]
        [Required(ErrorMessage = "Field can't be empty")]
        public int ServiceId { get; set; }

        [Range(0, Int32.MaxValue)]
        [Required(ErrorMessage = "Field can't be empty")]
        public int Price { get; set; }

        [Range(11,48, ErrorMessage = "ToothNum between 11 and 48")]
        [Required(ErrorMessage = "Field can't be empty")]
        public int ToothNum { get; set; }

        [StringLength(maximumLength:1024, ErrorMessage = "Description should be maximum 1024 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string Description { get; set; }

        [Range(0, Int32.MaxValue)]
        [Required(ErrorMessage = "Field can't be empty")]
        public int XrayId { get; set; }
    }
}