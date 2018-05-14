using System;
using Newtonsoft.Json;

namespace DentistRegistration.Models
{
    public class CalendarEvent
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public int UserId { get; set; }

        [JsonProperty(PropertyName = "doctorId")]
        public int DoctorId { get; set; }

        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "desc")]
        public string Desc { get; set; }

        [JsonProperty(PropertyName = "start")]
        public DateTime Start { get; set; }

        [JsonProperty(PropertyName = "end")]
        public DateTime End { get; set; }

        [JsonProperty(PropertyName = "hasBeenBooked")]
        public bool HasBeenBooked { get; set; }
    }
}