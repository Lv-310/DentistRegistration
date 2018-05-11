using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Web;


namespace DentistRegistration.DataAccessLayer
{
    public class VersionDataAccessLayer
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public string GetDatabaseVersion()
        {
            var querry = "SELECT VERSION_NUM FROM VERSION WHERE ID = 1";
            var version = "-1";

            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                var command = new SqlCommand(querry, con);
                version = (string)command.ExecuteScalar();
            }

            return version;
        }

        public string GetBackEndVersion()
        {
           return File.ReadAllLines(HttpContext.Current.Server.MapPath("~/") + "../version.txt")[0].Trim();
        }
    }
}