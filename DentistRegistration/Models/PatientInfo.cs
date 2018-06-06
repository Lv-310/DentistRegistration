using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DentistRegistration.Models
{
    public class PatientInfo
    {
        [Range(0, Int32.MaxValue)]
        [Required(ErrorMessage = "Field can't be empty")]
        public int Id { get; set; }

        [Range(0, Int32.MaxValue)]
        [Required(ErrorMessage = "Field can't be empty")]
        public int PatientId { get; set; }

        [StringLength(maximumLength: 100, ErrorMessage = "Description should be maximum 100 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string MucosalCondition { get; set; }

        [StringLength(maximumLength: 100, ErrorMessage = "Description should be maximum 100 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string Bite { get; set; }

        [StringLength(maximumLength: 100, ErrorMessage = "Description should be maximum 100 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string DoctorSupervision { get; set; }

        [StringLength(maximumLength: 100, ErrorMessage = "Description should be maximum 100 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string DrugUse { get; set; }

        [StringLength(maximumLength: 100, ErrorMessage = "Description should be maximum 100 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string Complains { get; set; }

        [StringLength(maximumLength: 100, ErrorMessage = "Description should be maximum 100 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string Anesthesia { get; set; }

        [Required(ErrorMessage = "Field can't be empty")]
        public DateTime FirstVisit { get; set; }

        [Required(ErrorMessage = "Field can't be empty")]
        public Alergie[] Alergies { get; set; }

        [Required(ErrorMessage = "Field can't be empty")]
        public InfoField[] InfoFields { get; set; }

    }
}