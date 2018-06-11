using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DentistRegistration.DataAccessLayer
{
    public class AvatarUploadDAL: IAvatarUpload
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public bool Update(string path, long phoneNum)
        {
            bool isInserted = false;
            
            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmdCheck = new SqlCommand("spCheckRole", con);

                cmdCheck.CommandType = CommandType.StoredProcedure;
                cmdCheck.Parameters.AddWithValue("@PHONENUM", phoneNum);
                SqlParameter outPutParameter = new SqlParameter("@Role", SqlDbType.NVarChar, 30)
                {
                    Direction = ParameterDirection.Output
                };

                cmdCheck.Parameters.Add(outPutParameter);

                cmdCheck.ExecuteNonQuery();

                string check = outPutParameter.Value.ToString();

                if (check.ToLower() == "doctor")
                {

                    SqlCommand cmd = new SqlCommand("spUpdateAvatar", con)
                    {
                        CommandType = CommandType.StoredProcedure
                    };
                    Doctor doctor = new Doctor();
                    cmd.Parameters.AddWithValue("@AVATARPATH", doctor.AvatarPath);
                    cmd.ExecuteNonQuery();
                    isInserted = true;

                }

                else if (check.ToLower() == "user")
                {

                    SqlCommand cmd = new SqlCommand("spUpdateAvatar", con)
                    {
                        CommandType = CommandType.StoredProcedure
                    };
                    User user = new User();
                    cmd.Parameters.AddWithValue("@AVATARPATH", user.AvatarPath);
                    cmd.ExecuteNonQuery();
                    isInserted = true;

                }
                else
                {
                    isInserted = false;
                }
            }

            return isInserted;
        }

    }
}