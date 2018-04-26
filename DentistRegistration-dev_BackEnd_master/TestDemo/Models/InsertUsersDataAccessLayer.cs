using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Configuration;

namespace TestDemo.Models
{
    public class InsertUsersDataAccessLayer
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public bool InsertUser(User user)
        {
            bool isInserted = false;
            SqlConnection con = new SqlConnection(connectionString);
            con.Open();
            SqlCommand cmdCheck = new SqlCommand("spCheckUser", con);
            cmdCheck.CommandType = CommandType.StoredProcedure;
            cmdCheck.Parameters.AddWithValue("@PHONENUM", user.Phonenum);
            SqlParameter outPutParameter = new SqlParameter("@COUNT", SqlDbType.Int);
            outPutParameter.Direction = System.Data.ParameterDirection.Output;
            cmdCheck.Parameters.Add(outPutParameter);
            cmdCheck.ExecuteNonQuery();
            int count = int.Parse(outPutParameter.Value.ToString());
            if (count == 0)
            {
                SqlCommand cmd = new SqlCommand("spAddUser", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FIRSTNAME", user.Firstname);
                cmd.Parameters.AddWithValue("@LASTNAME", user.Lastname);
                cmd.Parameters.AddWithValue("@PHONENUM", user.Phonenum);
                cmd.Parameters.AddWithValue("@USER_PASSWORD", user.Password);
                cmd.Parameters.AddWithValue("@EMAIL", user.Email);
                cmd.ExecuteNonQuery();
                isInserted = true;
            }
            con.Close();
            return isInserted;
        }
    }
}