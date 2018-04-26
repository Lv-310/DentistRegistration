using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace DentistRegistration.Models
{
    public class LoginViewModel
    {
        [Range(100000000000, 999999999999, ErrorMessage = "Number should be 12 digits")]
        [Required(ErrorMessage = "Field can't be empty")]
        public long Phonenum { get; set; }

        [StringLength(50, MinimumLength = 6, ErrorMessage = "Password Should be minimum 6 characters and a maximum of 50 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string Password { get; set; }
    }
}