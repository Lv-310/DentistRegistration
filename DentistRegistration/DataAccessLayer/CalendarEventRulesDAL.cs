using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DentistRegistration.DataAccessLayer
{
    public class CalendarEventRulesDAL: IRepositoryCRUD<CalendarEventRule>
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public bool Delete(int id)
        {
            bool isDeleted = false;
            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmdCheck = new SqlCommand("spDeleteEventRule", con);

                cmdCheck.CommandType = CommandType.StoredProcedure;
                cmdCheck.Parameters.AddWithValue("@RULE_ID", id);

                cmdCheck.ExecuteNonQuery();

                isDeleted = true;
            }
            return isDeleted;
        }

        public IEnumerable<CalendarEventRule> GetAll()
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

        public CalendarEventRule GetById(int id)
        {
            throw new NotImplementedException();
        }

        public bool Insert(CalendarEventRule entity)
        {
            throw new NotImplementedException();
        }

        public bool Update(CalendarEventRule entity)
        {
            bool isUpdated = false;
            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmdCheck = new SqlCommand("spUpdateEventRule", con);

                cmdCheck.CommandType = CommandType.StoredProcedure;
                cmdCheck.Parameters.AddWithValue("@RULE_ID", entity.Id);
                cmdCheck.Parameters.AddWithValue("@ISINCLUDE", entity.IsInclude);
                cmdCheck.Parameters.AddWithValue("@STARTDATE", entity.StartDate);
                cmdCheck.Parameters.AddWithValue("@TIMETOFINISH", entity.TimeToFinish.TotalSeconds);
                cmdCheck.Parameters.AddWithValue("@EVENTDURATION", entity.EventDuration.TotalSeconds);
                cmdCheck.Parameters.AddWithValue("@REPEATINTERVAL", entity.RepeatInterval.TotalSeconds);
                cmdCheck.Parameters.AddWithValue("@DATEEXPIRE", entity.ExpireDate);

                cmdCheck.ExecuteNonQuery();
                isUpdated = true;

            }
            return isUpdated;
        }
    }
}