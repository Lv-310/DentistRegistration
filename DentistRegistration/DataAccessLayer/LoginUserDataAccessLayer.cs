using System.Web;
using System.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
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
            var query = "select count(id_User) from users where PHONENUM = {0} and USER_PASSWORD = '{1}'";

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(String.Format(query, user.PhoneNum, user.Password));

                count = (int)cmd.ExecuteScalar();
            }

            return (count > 0) ? true : false;
        }
    }
}