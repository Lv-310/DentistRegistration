﻿using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using DentistRegistration.Models;
using DentistRegistration.Servises;

namespace DentistRegistration.DataAccessLayer
{
    public class LoginUserDataAccessLayer
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        // check whether there is a user with such a login and password
        public bool Login(LoginViewModel user)
        {
            string password;
            int id;

            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("spCheckLogin", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                cmd.Parameters.AddWithValue("@PHONENUM", user.PhoneNum);
                SqlParameter outPutParameter = new SqlParameter("@USER_PASSWORD", SqlDbType.NVarChar, 320)
                {
                    Direction = ParameterDirection.Output
                };
                SqlParameter outPutParameter1 = new SqlParameter("@ID_USER", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                SqlParameter outPutParameterFirstname = new SqlParameter("@FIRSTNAME", SqlDbType.VarChar,30)
                {
                    Direction = ParameterDirection.Output
                };
                SqlParameter outPutParameterLastname = new SqlParameter("@LASTNAME", SqlDbType.VarChar,30)
                {
                    Direction = ParameterDirection.Output
                };

                cmd.Parameters.Add(outPutParameterPassword);
                cmd.Parameters.Add(outPutParameterId);
                cmd.Parameters.Add(outPutParameterFirstname);
                cmd.Parameters.Add(outPutParameterLastname);
                cmd.ExecuteNonQuery();

                cmd.ExecuteNonQuery();
                password = outPutParameter.Value.ToString();
                id = Convert.ToInt32(outPutParameter1.Value);
            }

            if (SecurePasswordHasher.Verify(user.Password, password))
            { return true; }
            return false;
        }
    }
}