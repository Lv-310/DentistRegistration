using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DentistRegistration.DataAccessLayer
{
    public class XRayDAL
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public int? InsertXRay(XRay xrayImage)
        {
            bool isInserted = false;

            using (var con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("spAddXRay", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                cmd.Parameters.AddWithValue("@USER_ID", xrayImage.User_Id);
                cmd.Parameters.AddWithValue("@LINK", xrayImage.Link);
                cmd.Parameters.AddWithValue("@XRAY_DATE", xrayImage.Date.Date);

                var id = (int?)cmd.ExecuteScalar();
                isInserted = true;
                return id;

            }
        }
    }
}