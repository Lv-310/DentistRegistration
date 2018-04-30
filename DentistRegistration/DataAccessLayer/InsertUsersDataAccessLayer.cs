﻿using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using DentistRegistration.Models;

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
                    cmd.Parameters.AddWithValue("@USER_PASSWORD", user.Password);
                    cmd.Parameters.AddWithValue("@EMAIL", user.Email);

                    cmd.ExecuteNonQuery();

                    isInserted = true;
                }
            }

            return isInserted;
        }
    }
}