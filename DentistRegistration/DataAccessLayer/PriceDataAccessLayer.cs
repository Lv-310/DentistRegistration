﻿using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DentistRegistration.DataAccessLayer
{
    public class PriceDataAccessLayer
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        // To View all Prices    
        public IEnumerable<PriceModel> GetAllPricesById(int id)
        {
            List<PriceModel> lstprices = new List<PriceModel>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {

                con.Open();
                SqlCommand cmd = new SqlCommand("spGetPricesByService", con);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@SERVICE_ID", id);
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    PriceModel price = new PriceModel
                    {
                        Id = Convert.ToInt32(reader.GetValue(0)),
                        Price = Convert.ToInt32(reader.GetValue(1)),
                        DateStart = Convert.ToDateTime(reader.GetValue(2)),
                        ServiceId = Convert.ToInt32(reader.GetValue(3))
                    };

                    lstprices.Add(price);
                }
            }
            return lstprices;
        }

        public bool InsertPrice(PriceModel price, out string message)
        {
            bool isInserted = false;
            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmdCheck = new SqlCommand("spCheckDate", con);

                cmdCheck.CommandType = CommandType.StoredProcedure;
                cmdCheck.Parameters.AddWithValue("@DATE_START_PRICE", price.DateStart);
                SqlParameter outPutParameter = new SqlParameter("@Result", SqlDbType.Bit)
                {
                    Direction = ParameterDirection.Output
                };

                cmdCheck.Parameters.Add(outPutParameter);

                cmdCheck.ExecuteNonQuery();

                string check = outPutParameter.Value.ToString();



                if (check.ToLower() == "true")
                {

                    SqlCommand cmd = new SqlCommand("spInsertPrice", con)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    cmd.Parameters.AddWithValue("@SERVICE_ID", price.ServiceId);
                    cmd.Parameters.AddWithValue("@PRICE", price.Price);
                    cmd.Parameters.AddWithValue("@DATE_START_PRICE", price.DateStart);

                    cmd.ExecuteNonQuery();
                    message = "Price is added";
                    isInserted = true;

                }
                else message = "You can not update previous prices";
            }

            return isInserted;
        }
    }
}