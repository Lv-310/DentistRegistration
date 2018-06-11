using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DentistRegistration.DataAccessLayer
{
    public class ToothDAL: IRepositoryCRUcollection<Tooth>
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public IEnumerable<Tooth> GetAll()
        {
            throw new NotImplementedException();
        }

        public Tooth GetById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Tooth> GetByTiedId(int id)
        {
            List<Tooth> lstteeth = new List<Tooth>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("spGetTeethByUserId", con);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@USER_ID", id);
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Tooth tooth = new Tooth
                    {
                        Id = Convert.ToInt32(reader.GetValue(0)),
                        UserId = Convert.ToInt32(reader.GetValue(1)),
                        ToothNumber =  Convert.ToInt32(reader.GetValue(2)),
                        Description = reader.GetValue(3).ToString()
                    };

                    lstteeth.Add(tooth);
                }
            }
            return lstteeth;
        }

        public bool Insert(Tooth tooth)
        {
            bool isInserted = false;
            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmdCheck = new SqlCommand("spCheckTooth", con);

                cmdCheck.CommandType = CommandType.StoredProcedure;
                cmdCheck.Parameters.AddWithValue("@TOOTH_NUMBER", tooth.ToothNumber);
                cmdCheck.Parameters.AddWithValue("@USER_ID", tooth.UserId);
                SqlParameter outPutParameter = new SqlParameter("@COUNT", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };

                cmdCheck.Parameters.Add(outPutParameter);

                cmdCheck.ExecuteNonQuery();

                int check = int.Parse(outPutParameter.Value.ToString());

                if (check == 0)
                {

                    SqlCommand cmd = new SqlCommand("spAddTooth", con)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    cmd.Parameters.AddWithValue("@TOOTH_NUMBER", tooth.ToothNumber);
                    cmd.Parameters.AddWithValue("@USER_ID", tooth.UserId);
                    cmd.Parameters.AddWithValue("@DESCRIPTIO", tooth.Description);
                    cmd.ExecuteNonQuery();

                    isInserted = true;

                }
            }
            return isInserted;
        }

        public bool Update(Tooth tooth)
        {
            bool isUpdated = false;
 
            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmdCheck = new SqlCommand("spCheckTooth", con);

                cmdCheck.CommandType = CommandType.StoredProcedure;
                cmdCheck.Parameters.AddWithValue("@TOOTH_NUMBER", tooth.ToothNumber);
                cmdCheck.Parameters.AddWithValue("@USER_ID", tooth.UserId);
                SqlParameter outPutParameter = new SqlParameter("@COUNT", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };

                cmdCheck.Parameters.Add(outPutParameter);

                cmdCheck.ExecuteNonQuery();

                int check = int.Parse(outPutParameter.Value.ToString());

                if (check == 1)
                {

                    SqlCommand cmd = new SqlCommand("spEditTooth", con)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    cmd.Parameters.AddWithValue("@TOOTH_NUMBER", tooth.ToothNumber);
                    cmd.Parameters.AddWithValue("@USER_ID", tooth.UserId);
                    cmd.Parameters.AddWithValue("@DESCRIPTIO", tooth.Description);

                    cmd.ExecuteNonQuery();
                    isUpdated = true;

                }
            }

            return isUpdated;
        }
    }
}