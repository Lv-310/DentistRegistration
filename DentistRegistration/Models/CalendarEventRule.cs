using System;

namespace DentistRegistration.Models
{
    public class CalendarEventRule
    {
        public int Id { get; set; }
        public bool IsInclude { get; set; }
        public DateTime StartDate { get; set; }
        public TimeSpan TimeToFinish { get; set; }
        public TimeSpan EventDuration { get; set; }
        public TimeSpan RepeatInterval { get; set; }
        public DateTime ExpireDate { get; set; }
    }
}