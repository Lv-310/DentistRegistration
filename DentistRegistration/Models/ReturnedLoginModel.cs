using System.ComponentModel.DataAnnotations;

namespace DentistRegistration.Models
{
    public class ReturnedLoginModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Id { get; set; }
    }
}