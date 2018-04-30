using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;

using DentistRegistration.Models;

namespace DentistRegistration.DataAccessLayer
{
    public class DoctorsDataAccessLayer
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        // To View all Doctors details    
        public IEnumerable<Doctor> GetAllDoctors()
        {
            List<Doctor> lstdoctors = new List<Doctor>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("Select * from Doctors", con);
                
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                
                while (reader.Read())
                {
                    Doctor doc = new Doctor();

                    doc = new Doctor
                    {
                        Id = Convert.ToInt32(reader.GetValue(0)),
                        FirstName = reader.GetValue(1).ToString(),
                        LastName = reader.GetValue(2).ToString(),
                        PhoneNum = Convert.ToInt64(reader.GetValue(3)),
                        CabNum = Convert.ToByte(reader.GetValue(4)),
                        Speciality = reader.GetValue(5).ToString(),
                        Doc_password = reader.GetValue(6).ToString()
                    };

                    lstdoctors.Add(doc);
                }
            }

            return lstdoctors;
        }
    }
}