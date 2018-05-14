using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DentistRegistration.DataAccessLayer
{
    public class CalendarEventDAL
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public IEnumerable<CalendarEvent> GetEvents()
        {
            List<CalendarEvent> lstevents = new List<CalendarEvent>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("Select * from CALENDAR_EVENT", con);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    CalendarEvent events = new CalendarEvent();

                    events = new CalendarEvent
                    {
                        Id = Convert.ToInt32(reader.GetValue(0)),
                        Title = reader.GetValue(1).ToString(),
                        Desc = reader.GetValue(2).ToString(),
                        Start = Convert.ToDateTime(reader.GetValue(3)),
                        End = Convert.ToDateTime(reader.GetValue(4)),
                        HasBeenBooked = Convert.ToBoolean(reader.GetValue(5))
                    };

                    lstevents.Add(events);
                }
                return lstevents;
            }
        }

        public bool InsertEvent(CalendarEvent cEvent)
        {
            bool isInserted = false;
            using (var con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmdCheck = new SqlCommand("spCheckEvent", con);
                cmdCheck.CommandType = CommandType.StoredProcedure;
                cmdCheck.Parameters.AddWithValue("@START_EVENT", cEvent.Start);
                cmdCheck.Parameters.AddWithValue("@DOCTOR_ID", cEvent.DoctorId);

                SqlParameter outPutParameter = new SqlParameter("@COUNT", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };

                cmdCheck.Parameters.Add(outPutParameter);

                cmdCheck.ExecuteNonQuery();

                int count = int.Parse(outPutParameter.Value.ToString());

                if (count == 0)
                {

                    SqlCommand cmd = new SqlCommand("spAddEvent", con)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    cmd.Parameters.AddWithValue("@DOCTOR_ID", cEvent.DoctorId);
                    cmd.Parameters.AddWithValue("@USER_ID", cEvent.UserId);
                    cmd.Parameters.AddWithValue("@TITLE", cEvent.Title);
                    cmd.Parameters.AddWithValue("@DESCRIPTIO", cEvent.Desc);
                    cmd.Parameters.AddWithValue("@START_EVENT", cEvent.Start);
                    cmd.Parameters.AddWithValue("@END_EVENT", cEvent.End);
                    cmd.Parameters.AddWithValue("@IS_BOOKED", cEvent.HasBeenBooked);

                    cmd.ExecuteNonQuery();

                    isInserted = true;

                }
            }

            return isInserted;
        }
    }
}