using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using DentistRegistration.Servises;

namespace DentistRegistration.DataAccessLayer
{
    public class UsersDAL: IRepositoryCRU<User>
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;


        public IEnumerable<User> GetAll()
        {
            List<User> userList = new List<User>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand command = new SqlCommand("SELECT * FROM USERS;", con);
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    User user = new User
                    {
                        FirstName = reader.GetValue(0).ToString(),
                        LastName = reader.GetValue(1).ToString(),
                        PhoneNum = Convert.ToInt64(reader.GetValue(2)),
                        Password = reader.GetValue(3).ToString(),
                        Email = reader.GetValue(4).ToString(),
                        Id = Convert.ToInt32(reader.GetValue(5))
                    };

                    userList.Add(user);
                }
                reader.Close();
            }
            return userList;
        }

        public User GetById(int id)
        {
            User user = new User();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("spGetUserById", con);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID_USER", id);
                SqlParameter outPutFirstName = new SqlParameter("@FIRSTNAME", SqlDbType.VarChar, 30)
                {
                    Direction = ParameterDirection.Output
                };
                cmd.Parameters.Add(outPutFirstName);

                SqlParameter outPutLastName = new SqlParameter("@LASTNAME", SqlDbType.VarChar, 30)
                {
                    Direction = ParameterDirection.Output
                };
                cmd.Parameters.Add(outPutLastName);

                SqlParameter outPutPhoneNum = new SqlParameter("@PHONENUM", SqlDbType.BigInt)
                {
                    Direction = ParameterDirection.Output
                };
                cmd.Parameters.Add(outPutPhoneNum);

                SqlParameter outPutEmail = new SqlParameter("@EMAIL", SqlDbType.VarChar,320)
                {
                    Direction = ParameterDirection.Output
                };
                cmd.Parameters.Add(outPutEmail);

                SqlParameter outPutAvatarPath = new SqlParameter("@AvatarPath", SqlDbType.NVarChar, 320)
                {
                    Direction = ParameterDirection.Output
                };
                cmd.Parameters.Add(outPutAvatarPath);

                cmd.ExecuteNonQuery();

                user = new User
                {
                    FirstName = cmd.Parameters["@FIRSTNAME"].Value.ToString(),
                    LastName = cmd.Parameters["@LASTNAME"].Value.ToString(),
                    PhoneNum = Convert.ToInt64(cmd.Parameters["@PHONENUM"].Value),
                    Email = cmd.Parameters["@EMAIL"].Value.ToString(),
                    Id = id,
                    AvatarPath=cmd.Parameters["@AvatarPath"].Value.ToString()
                };
            }
            return user;
        }

        public bool Insert(User user)
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

        public bool Update(User entity)
        {
            throw new NotImplementedException();
        }
    }
}