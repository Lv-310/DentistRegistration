using System.ComponentModel.DataAnnotations;

namespace DentistRegistration.Models
{
    public class Doctor
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

        [Range(1, 999, ErrorMessage = "Cubinet number should be from 1 to 3 digits")]
        [Required(ErrorMessage = "Field can't be empty")]
        public byte CabNum { get; set; }

        [StringLength(30, MinimumLength = 1, ErrorMessage = "Speciality should be minimum 1 character and maximum 30 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string Speciality { get; set; }

        [StringLength(15, MinimumLength = 6, ErrorMessage = "Password should be minimum 6 characters and maximum 15 characters")]
        [Required(ErrorMessage = "Field can't be empty")]
        public string Doc_password { get; set; }
    }
}