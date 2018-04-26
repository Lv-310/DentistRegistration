using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Configuration;

namespace DentistRegistration.Models
{
    public class InsertUsersDataAccessLayer
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public void InsertUser(User user)
        {
            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand("spAddUser", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@FIRSTNAME", user.Firstname);
            cmd.Parameters.AddWithValue("@LASTNAME", user.Lastname);
            cmd.Parameters.AddWithValue("@PHONENUM", user.Phonenum);
            cmd.Parameters.AddWithValue("@USER_PASSWORD", user.Password);
            con.Open();
            cmd.ExecuteNonQuery();
            con.Close();
        }
    }
}