using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using DentistRegistration.Models;
using DentistRegistration.Servises;

namespace DentistRegistration.DataAccessLayer
{
    public class InsertUsersDataAccessLayer
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public bool InsertUser(User user)
        {
            bool isInserted = false;
            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmdCheck = new SqlCommand("spCheckUser", con);

                cmdCheck.CommandType = CommandType.StoredProcedure;
                cmdCheck.Parameters.AddWithValue("@PHONENUM", user.PhoneNum);
                SqlParameter outPutParameter = new SqlParameter("@COUNT", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };

                cmdCheck.Parameters.Add(outPutParameter);

                cmdCheck.ExecuteNonQuery();

                int count = int.Parse(outPutParameter.Value.ToString());

                if (count == 0)
                {
                    SqlCommand cmd = new SqlCommand("spAddUser", con)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    cmd.Parameters.AddWithValue("@FIRSTNAME", user.FirstName);
                    cmd.Parameters.AddWithValue("@LASTNAME", user.LastName);
                    cmd.Parameters.AddWithValue("@PHONENUM", user.PhoneNum);
                    cmd.Parameters.AddWithValue("@USER_PASSWORD", SecurePasswordHasher.Hash(user.Password));
                    cmd.Parameters.AddWithValue("@EMAIL", user.Email);
                    cmd.Parameters.AddWithValue("@ID_ROLE", 1);

                    cmd.ExecuteNonQuery();

                    isInserted = true;
                }
            }

            return isInserted;
        }

        internal bool UpdateUser(User user)
        {
            bool isUpdated = false;
            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("spUpdateUser", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                cmd.Parameters.AddWithValue("@ID", user.Id);
                cmd.Parameters.AddWithValue("@FIRSTNAME", user.FirstName);
                cmd.Parameters.AddWithValue("@LASTNAME", user.LastName);
                cmd.Parameters.AddWithValue("@PHONENUM", user.PhoneNum);
                cmd.Parameters.AddWithValue("@EMAIL", user.Email);

                cmd.ExecuteNonQuery();

                isUpdated = true;
            }
            return isUpdated;
        }
    }
}