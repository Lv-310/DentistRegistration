using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace DentistRegistration.Models
{
    public class InsertUsersDataAccessLayer
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public void InsertUser(User user)
        {
            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand("spAddUser", con)
            {
                CommandType = CommandType.StoredProcedure
            };
            cmd.Parameters.AddWithValue("@FIRSTNAME", user.FirstName);
            cmd.Parameters.AddWithValue("@LASTNAME", user.LastName);
            cmd.Parameters.AddWithValue("@PHONENUM", user.PhoneNum);
            cmd.Parameters.AddWithValue("@USER_PASSWORD", user.Password);
            con.Open();
            cmd.ExecuteNonQuery();
            con.Close();
        }
    }
}