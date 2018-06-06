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
    public class InfoFieldDAL:IRepositoryCRUcollection<InfoField>
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public IEnumerable<InfoField> GetAll()
        {
            throw new NotImplementedException();
        }

        public InfoField GetById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<InfoField> GetByTiedId(int id)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("spGetInfoFieldsByPatientId", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PatientId", id);
                var adapter = new SqlDataAdapter(cmd);
                var table = new DataTable();
                adapter.Fill(table);

                var result = new List<InfoField>();

                foreach (DataRow row in table.Rows)
                {
                    result.Add(new InfoField() { Id = (int)row["ID"], Name = row["FieldName"].ToString(), Value = (bool)row["FieldValue"] });
                }

                return result;
            }
        }

        public bool Insert(InfoField entity)
        {
            throw new NotImplementedException();
        }

        public bool Update(InfoField entity)
        {
            throw new NotImplementedException();
        }
    }
}