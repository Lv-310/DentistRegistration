using System;
using System.Collections.Generic;
using DentistRegistration.Models;

namespace DentistRegistration.DataAccessLayer
{
    public class CalendarEventsDataAccessLayer
    {
        public IEnumerable<CalendarEventRule> GetRules(DateTime from, DateTime to)
        {
            return new CalendarEventRule[]
                {
                    new CalendarEventRule(){
                        Id = 1,
                        IsInclude = true,
                        StartDate = new DateTime(2018,04,28,8,0,0),
                        TimeToFinish = new TimeSpan(0,6,0,0),
                        EventDuration = new TimeSpan(0,0,30,0),
                        ExpireDate = new DateTime(2019,04,28,8,0,0),
                        RepeatInterval =new TimeSpan(2,0,0,0) },
                    new CalendarEventRule(){
                        Id = 2,
                        IsInclude = true,
                        StartDate = new DateTime(2018,04,29,14,0,0),
                        TimeToFinish = new TimeSpan(0,6,0,0),
                        EventDuration = new TimeSpan(0,0,30,0),
                        ExpireDate = new DateTime(2019,04,29,14,0,0),
                        RepeatInterval = new TimeSpan(2,0,0,0) },
                    new CalendarEventRule(){
                        Id = 3,
                        IsInclude = false,
                        StartDate = new DateTime(2018,04,28,0,0,0),
                        TimeToFinish = new TimeSpan(1,0,0,0),
                        EventDuration = new TimeSpan(1,0,0,0),
                        ExpireDate = new DateTime(2019,04,28,0,0,0),
                        RepeatInterval = new TimeSpan(7,0,0,0) },
                    new CalendarEventRule(){
                        Id = 4,
                        IsInclude = false,
                        StartDate = new DateTime(2018,04,29,0,0,0),
                        TimeToFinish = new TimeSpan(1,0,0,0),
                        EventDuration = new TimeSpan(1,0,0,0),
                        ExpireDate = new DateTime(2019,04,29,0,0,0),
                        RepeatInterval = new TimeSpan(7,0,0,0) },
                };
        }
    }
}