using System;
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
        public LoginViewModel CheckLogin(LoginViewModel user)
        {
            LoginViewModel LoginnedUser = new LoginViewModel();
            LoginnedUser.PhoneNum = user.PhoneNum;

            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("spCheckLogin", con);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PHONENUM", user.PhoneNum);
                SqlParameter outPutParameterPassword = new SqlParameter("@USER_PASSWORD", SqlDbType.NVarChar, 320)
                {
                    Direction = ParameterDirection.Output
                };
                SqlParameter outPutParameterId = new SqlParameter("@ID_USER", SqlDbType.Int)
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

                
                


                LoginnedUser.Password=outPutParameterPassword.Value.ToString();
                if (string.IsNullOrEmpty(LoginnedUser.Password)) return null;
                LoginnedUser.Id = Convert.ToInt32(outPutParameterId.Value);
                LoginnedUser.FirstName = outPutParameterFirstname.Value.ToString();
                LoginnedUser.LastName = outPutParameterLastname.Value.ToString();



                

            }

            if (SecurePasswordHasher.Verify(user.Password, LoginnedUser.Password))
            {
                LoginnedUser.Password = null;
                return LoginnedUser; }
            return null;
        }
    }
}