using System;
using System.Configuration;
using System.Data.SqlClient;
using DentistRegistration.Models;

namespace DentistRegistration.DataAccessLayer
{
    public class LoginUserDataAccessLayer
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        // check whether there is a user with such a login and password
        public bool Login(LoginViewModel user)
        {
            int count;
            var query = @"select count(id_User) from users where PHONENUM = @PHONENUM and USER_PASSWORD = @PASSWORD";

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@PHONENUM", user.PhoneNum);
                cmd.Parameters.AddWithValue("@PASSWORD", user.Password);

                count = (int)cmd.ExecuteScalar();
            }

            return (count > 0) ? true : false;
        }
    }
}