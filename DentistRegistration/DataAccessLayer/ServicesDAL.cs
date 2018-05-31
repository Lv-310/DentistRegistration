using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DentistRegistration.DataAccessLayer
{
    public class ServicesDAL: IRepositoryCRUD<Service>
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        // To View all Service details    
        public IEnumerable<Service> GetAll()
        {
            List<Service> lstservices = new List<Service>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("spGetService", con);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Service serv = new Service
                    {
                        Id = Convert.ToInt32(reader.GetValue(0)),
                        Name = reader.GetValue(1).ToString(),
                        Description = reader.GetValue(2).ToString()
                    };

                    lstservices.Add(serv);
                }
            }

            return lstservices;
        }

        public Service GetById(int id)
        {
            throw new NotImplementedException();
        }

        public bool Insert(Service service)
        {
            bool isInserted = false;
            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmdCheck = new SqlCommand("spCheckService", con);

                cmdCheck.CommandType = CommandType.StoredProcedure;
                cmdCheck.Parameters.AddWithValue("@NAME_SERVICE", service.Name);
                SqlParameter outPutParameter = new SqlParameter("@COUNT", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };

                cmdCheck.Parameters.Add(outPutParameter);

                cmdCheck.ExecuteNonQuery();

                int count = int.Parse(outPutParameter.Value.ToString());

                if (count == 0)
                {

                    SqlCommand cmd = new SqlCommand("spInsertService", con)
                    {
                        CommandType = CommandType.StoredProcedure
                    };


                    cmd.Parameters.AddWithValue("@NAME_SERVICE", service.Name);
                    cmd.Parameters.AddWithValue("@DESCRIPTION_SERVICE", service.Description);

                    cmd.ExecuteNonQuery();

                    isInserted = true;

                }
            }

            return isInserted;
        }

        public bool Update(Service entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}