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
    public class AvatarUploadDAL : IAvatarUpload
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public bool Update(AvatarViewModel avatar)
        {
            bool isInserted = false;

            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmdCheck = new SqlCommand("spUpdateAvatar", con);

                cmdCheck.CommandType = CommandType.StoredProcedure;
                cmdCheck.Parameters.AddWithValue("@PHONENUM", avatar.PhoneNum);

                cmdCheck.Parameters.AddWithValue("@AVATAR_PATH", avatar.Path);

                cmdCheck.ExecuteNonQuery();
                isInserted = true;

            }
            return isInserted;


        }
    }
    }
