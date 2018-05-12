namespace DentistRegistration.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long PhoneNum { get; set; }
        public byte CabNum { get; set; }
        public string Speciality { get; set; }
        public string Doc_password { get; set; }
    }
}