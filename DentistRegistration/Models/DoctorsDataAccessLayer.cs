using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Configuration;

namespace DentistRegistration.Models
{
    public class DoctorsDataAccessLayer
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        //To View all Doctors details    
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

                    doc = new Doctor();
                    doc.Id = Convert.ToInt32(reader.GetValue(0));
                    doc.FirstName = reader.GetValue(1).ToString();
                    doc.LastName = reader.GetValue(2).ToString();
                    doc.PhoneNum = Convert.ToInt64(reader.GetValue(3));
                    doc.CabNum = Convert.ToByte(reader.GetValue(4));
                    doc.Speciality = reader.GetValue(5).ToString();
                    doc.Doc_password = reader.GetValue(6).ToString();

                    lstdoctors.Add(doc);
                }

                con.Close();
            }

            return lstdoctors;
        }
    }
}