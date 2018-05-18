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

        public IEnumerable<CalendarEvent> GetEventsByDoctor(int idDoctor)
        {
            List<CalendarEvent> colectionEvents = new List<CalendarEvent>();
            string sql = "spGetEvents";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                
                    using (SqlDataAdapter da = new SqlDataAdapter())
                    {
                        da.SelectCommand = new SqlCommand(sql, conn);
                        da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.SelectCommand.Parameters.AddWithValue("@DOCTOR_ID", idDoctor);

                    DataSet ds = new DataSet();
                        da.Fill(ds, "Events");

                        DataTable dt = ds.Tables["Events"];

                        foreach (DataRow row in dt.Rows)
                        {
                            CalendarEvent events = new CalendarEvent();

                        events = new CalendarEvent();

                        events.Id = Convert.ToInt32(row[0]);
                        events.Title = row[3].ToString();
                        events.Desc = row[4].ToString();
                        events.Start = Convert.ToDateTime(row[5]);
                        string DateTimeEnd = row[6].ToString();
                        DateTimeEnd.Substring(DateTimeEnd.Length - 3);
                        events.End = DateTime.Parse(DateTimeEnd);
                        events.HasBeenBooked = Convert.ToBoolean(row[7]);
                            

                            colectionEvents.Add(events);
                        }
                    }
            }

            return colectionEvents;
        }
        


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
                        UserId = Convert.ToInt32(reader.GetValue(1)),
                        DoctorId = Convert.ToInt32(reader.GetValue(2)),
                        Title = reader.GetValue(3).ToString(),
                        Desc = reader.GetValue(4).ToString(),
                        Start = Convert.ToDateTime(reader.GetValue(5)),
                        End = Convert.ToDateTime(reader.GetValue(6)),
                        HasBeenBooked = Convert.ToBoolean(reader.GetValue(7))
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