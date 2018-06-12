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
    public class DoctorsDAL:IRepositoryCRU<Doctor>
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        // To View all Doctors details    
        public IEnumerable<Doctor> GetAll()
        {
            List<Doctor> lstdoctors = new List<Doctor>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("Select * from Doctors", con);
                
                 con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                
                while (reader.Read())
                {
                    Doctor doc = new Doctor();

                    doc = new Doctor
                    {

                        FirstName = reader.GetValue(0).ToString(),
                        LastName = reader.GetValue(1).ToString(),
                        PhoneNum = Convert.ToInt64(reader.GetValue(2)),
                        CabNum = Convert.ToByte(reader.GetValue(3)),
                        Speciality = reader.GetValue(4).ToString(),
                        Doc_password = reader.GetValue(5).ToString(),
                        Id = Convert.ToInt32(reader.GetValue(7)),
                      
                    };

                    lstdoctors.Add(doc);
                }
            }

            return lstdoctors;
        }

        public bool Update(Doctor doctor)
        {
            bool isUpdated = false;
            using (var con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("spUpdateDoctor", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                cmd.Parameters.AddWithValue("@ID", doctor.Id);
                cmd.Parameters.AddWithValue("@FIRSTNAME", doctor.FirstName);
                cmd.Parameters.AddWithValue("@LASTNAME", doctor.LastName);
                cmd.Parameters.AddWithValue("@PHONENUM", doctor.PhoneNum);
                cmd.Parameters.AddWithValue("@CABNUM", doctor.CabNum);
                cmd.Parameters.AddWithValue("@SPECIALITY", doctor.Speciality);

                cmd.ExecuteNonQuery();

                isUpdated = true;
            }

            return isUpdated;
        }

        public Doctor GetById(int id)
        {
            Doctor doc = new Doctor();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("spGetDoctorById", con);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID_DOCTOR", id);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    doc = new Doctor
                    {
                        Id = Convert.ToInt32(reader.GetValue(7)),
                        FirstName = reader.GetValue(0).ToString(),
                        LastName = reader.GetValue(1).ToString(),
                        PhoneNum = Convert.ToInt64(reader.GetValue(2)),
                        CabNum = Convert.ToByte(reader.GetValue(3)),
                        Speciality = reader.GetValue(4).ToString(),
                        Doc_password = reader.GetValue(5).ToString(),
                        AvatarPath = Convert.ToString(reader.GetValue(8)),
                    };
                }
            }
            return doc;
        }

        public bool Insert(Doctor doctor)
        {
            bool isInserted = false;
            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                SqlCommand cmdCheck = new SqlCommand("spCheckDoctor", con);

                cmdCheck.CommandType = CommandType.StoredProcedure;
                cmdCheck.Parameters.AddWithValue("@PHONENUM", doctor.PhoneNum);
                SqlParameter outPutParameter = new SqlParameter("@COUNT", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };

                cmdCheck.Parameters.Add(outPutParameter);

                cmdCheck.ExecuteNonQuery();

                int count = int.Parse(outPutParameter.Value.ToString());

                if (count == 0)
                {
                    SqlCommand cmd = new SqlCommand("spAddDoctor", con)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    cmd.Parameters.AddWithValue("@FIRSTNAME", doctor.FirstName);
                    cmd.Parameters.AddWithValue("@LASTNAME", doctor.LastName);
                    cmd.Parameters.AddWithValue("@PHONENUM", doctor.PhoneNum);
                    cmd.Parameters.AddWithValue("@CABNUM", doctor.CabNum);
                    cmd.Parameters.AddWithValue("@SPECIALITY", doctor.Speciality);
                    cmd.Parameters.AddWithValue("@DOC_PASSWORD", SecurePasswordHasher.Hash(doctor.Doc_password));


                    cmd.ExecuteNonQuery();

                    isInserted = true;
                }
            }

            return isInserted;
        }

      
    }
}