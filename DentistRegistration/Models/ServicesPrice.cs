using System;

namespace DentistRegistration.Models
{
    public class Prices
    {
        public int Id { get; set; }
        public int Price { get; set; }
        public DateTime DateStartPrice { get; set; }
        public DateTime DateEndtPrice { get; set; }
    }
}