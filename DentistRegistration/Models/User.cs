using System.ComponentModel.DataAnnotations;

namespace DentistRegistration.Models
{
    public class User
    {
        public int Id { get; set; }

        [StringLength(30, MinimumLength = 1, ErrorMessage = "First name should be minimum 1 character and maximum 30 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string FirstName { get; set; }

        [StringLength(30, MinimumLength = 1, ErrorMessage = "Last name should be minimum 1 character and maximum 30 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string LastName { get; set; }

        [Range(100000000000, 999999999999, ErrorMessage = "Number should be 12 digits")]
        [Required(ErrorMessage = "Field can't be empty")]
        public long PhoneNum { get; set; }

        [StringLength(15, MinimumLength = 6, ErrorMessage = "Password should be minimum 6 characters and maximum 15 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string Password { get; set; }

        [RegularExpression("^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string Email { get; set; }
    }
}