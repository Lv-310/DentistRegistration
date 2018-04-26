using System.Web;
using System.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace DentistRegistration.Models
{
    public class LoginUserDataAccessLayer
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        int count;

        // check whether there is a user with such a login and password
        public bool Login(LoginViewModel user)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand($"select count(id_User) from users where PHONENUM = {user.Phonenum} and USER_PASSWORD = '{user.Password}'", con);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                count = Convert.ToInt32(reader.GetValue(0));
                }
                 con.Close();

                if (count > 0)
                    return true;
                return false;
            }
        }
    
}
}