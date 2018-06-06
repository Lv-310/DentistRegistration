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
    public class PatientInfoDAL:IRepositoryCRU<PatientInfo>
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public IEnumerable<PatientInfo> GetAll()
        {
            throw new NotImplementedException();
        }

        public PatientInfo GetById(int id)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("select * from PatientInfo where PatientId = @PatientId", conn);
                cmd.Parameters.AddWithValue("@PatientId", id);
                var adapter = new SqlDataAdapter(cmd);
                var table = new DataTable();
                adapter.Fill(table);

                var result = new PatientInfo();

                var row = table.Rows[0];
                result = new PatientInfo() {
                    Id = (int)row["ID"],
                    PatientId = (int)row["PatientId"],
                    Bite = row["Bite"].ToString(),
                    Anesthesia = row["Anesthesia"].ToString(),
                    Complains = row["Complains"].ToString(),
                    DoctorSupervision = row["DoctorSupervision"].ToString(),
                    DrugUse = row["DrugUse"].ToString(),
                    MucosalCondition = row["MucosalCondition"].ToString(),
                    FirstVisit = (DateTime)row["FirstVisit"],
                    Alergies = new AlergieDAL().GetByTiedId(id).ToArray(),
                    InfoFields = new InfoFieldDAL().GetByTiedId(id).ToArray()
                };

                return result;
            }
        }

        public bool Insert(PatientInfo entity)
        {
            throw new NotImplementedException();
        }

        public bool Update(PatientInfo entity)
        {
            throw new NotImplementedException();
        }
    }
}