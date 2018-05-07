using System.ComponentModel.DataAnnotations;

namespace DentistRegistration.Models
{
    public class LoginViewModel
    {


        [Range(100000000000, 999999999999, ErrorMessage = "Number should be 12 digits")]
        [Required(ErrorMessage = "Field can't be empty")]
        public long PhoneNum { get; set; }

        [StringLength(15, MinimumLength = 6, ErrorMessage = "Password Should be minimum 6 characters and maximum 15 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string Password { get; set; }


        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Id { get; set; }

    }
}