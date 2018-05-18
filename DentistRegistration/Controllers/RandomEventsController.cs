using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using DentistRegistration.DataAccessLayer;
using DentistRegistration.Models;

namespace DentistRegistration.Controllers
{
    public class RandomEventsController : ApiController
    {
        private CalendarEventDAL eventsDAL = new CalendarEventDAL();
        // GET: api/RandomEvents
        public IEnumerable<CalendarEvent> Get()
        {
            return Get(1);
        }

        // GET: api/RandomEvents/5
        public IEnumerable<CalendarEvent> Get(int id)
        {
            var listEvents = eventsDAL.GetEventsByDoctor(id).ToList();
            var fakeEvents = GenerateEvents(DateTime.Now - new TimeSpan(10,0,0,0), DateTime.Now.AddDays(10)).ToList();
            return RemoveExistingEvents(fakeEvents, listEvents);
        }

        private IEnumerable<CalendarEvent> RemoveExistingEvents(List<CalendarEvent> fakeEvents, List<CalendarEvent> listEvents)
        {
            foreach(var evnt in listEvents)
            {
                fakeEvents.RemoveAll(x => x.Start <= evnt.Start && x.End >= evnt.End);
                fakeEvents.Add(evnt);
            }
            return fakeEvents;
        }

        private IEnumerable<CalendarEvent> GenerateEvents(DateTime from, DateTime to)
        {
            var rules = new CalendarEventsDataAccessLayer().GetRules(from, to).ToList();

            var numOfRules = rules.Count();

            // Removing rule repeating over requested view range for optimization purposes
            for (int i = 0; i < numOfRules; i++)
            {
                if (rules[i].ExpireDate > to)
                {
                    rules[i].ExpireDate = to;
                }

                if (rules[i].StartDate < from - rules[i].RepeatInterval)
                {
                    while (rules[i].StartDate < from - rules[i].RepeatInterval)
                    {
                        rules[i].StartDate += rules[i].RepeatInterval;
                    }
                }
            }

            var includes = rules.Where(x => x.IsInclude == true).ToList();
            var excludes = rules.Where(x => x.IsInclude == false).ToList();

            List<CalendarEvent> events = new List<CalendarEvent>();

            var startId = -1;

            foreach (var rule in includes)
            {
                var dateTime = rule.StartDate;
                while (dateTime < rule.ExpireDate)
                {
                    var eventDate = dateTime;
                    while (eventDate < dateTime + rule.TimeToFinish)
                    {
                        events.Add(new CalendarEvent() { Id = -1, Title = eventDate.TimeOfDay.ToString(), Desc = string.Empty, Start = eventDate, End = eventDate + rule.EventDuration });
                        eventDate += rule.EventDuration;
                    }

                    dateTime += rule.RepeatInterval;
                }
            }

            foreach (var rule in excludes)
            {
                var dateTime = rule.StartDate;
                while (dateTime < rule.ExpireDate)
                {
                    var eventDate = dateTime;
                    while (eventDate < dateTime + rule.TimeToFinish)
                    {
                        events.RemoveAll(x => x.Start >= eventDate && x.End <= eventDate + rule.TimeToFinish);
                        eventDate += rule.EventDuration;
                    }

                    dateTime += rule.RepeatInterval;
                }
            }

            events.RemoveAll(x => x.Start < from && x.End > to);

            var count = events.Count;

            for (int i = 0; i < count; i++)
            {
                events[i].Id = startId - i;
            }

            return events;
        }
    }
}
