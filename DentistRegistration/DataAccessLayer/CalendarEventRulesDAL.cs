using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DentistRegistration.DataAccessLayer
{
    public class CalendarEventRulesDAL
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public IEnumerable<CalendarEventRule> GetEventRules()
        {
            List<CalendarEventRule> lseventRules = new List<CalendarEventRule>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("Select * from CALENDAR_EVENT_RULE", con);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    CalendarEventRule eventRule = new CalendarEventRule();

                    eventRule = new CalendarEventRule
                    {
                        Id = Convert.ToInt32(reader.GetValue(0)),
                        IsInclude = Convert.ToBoolean(reader.GetValue(1)),
                        StartDate = Convert.ToDateTime(reader.GetValue(2)),
                        TimeToFinish = TimeSpan.Parse(reader.GetValue(3).ToString()),
                        EventDuration = TimeSpan.Parse(reader.GetValue(4).ToString()),
                        RepeatInterval = TimeSpan.Parse(reader.GetValue(5).ToString()),
                        ExpireDate = Convert.ToDateTime(reader.GetValue(6))
                    };

                    lseventRules.Add(eventRule);
                }
                return lseventRules;
            }
        }
    }
}