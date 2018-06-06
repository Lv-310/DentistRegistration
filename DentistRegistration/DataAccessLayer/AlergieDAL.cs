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
    public class AlergieDAL : IRepositoryCRUcollection<Alergie>
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public IEnumerable<Alergie> GetAll()
        {
            throw new NotImplementedException();
        }

        public Alergie GetById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Alergie> GetByTiedId(int id)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("spGetAlergiesByPatientId", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PatientId", id);
                var adapter = new SqlDataAdapter(cmd);
                var table = new DataTable();
                adapter.Fill(table);

                var result = new List<Alergie>();

                foreach (DataRow row in table.Rows)
                {
                    result.Add(new Alergie() { Id = (int)row["ID"], Name = row["AlergieName"].ToString() });
                }

                return result;
            }
        }

        public bool Insert(Alergie entity)
        {
            throw new NotImplementedException();
        }

        public bool Update(Alergie entity)
        {
            throw new NotImplementedException();
        }
    }
}