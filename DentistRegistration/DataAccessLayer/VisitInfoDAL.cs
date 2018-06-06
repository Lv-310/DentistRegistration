using DentistRegistration.Interfaces;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DentistRegistration.DataAccessLayer
{
    public class VisitInfoDAL : IRepositoryCRU<VisitInfo>
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public IEnumerable<VisitInfo> GetAll()
        {
            throw new NotImplementedException();
        }

        public VisitInfo GetById(int id)
        {
            throw new NotImplementedException();
        }

        public bool Insert(VisitInfo entity)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                conn.Open();
                var tran = conn.BeginTransaction();
                try
                {
                    InsertVisit(entity,conn,tran);
                    var id = GetVisitId(conn,tran);
                    foreach (var service in entity.Services)
                    {
                        service.VisitId = id;
                        InsertService(service,conn,tran);
                    }
                }
                catch (SqlException ex)
                {
                    tran.Rollback();
                    return false;
                }
                tran.Commit();
                return true;
            }
        }

        public bool Update(VisitInfo entity)
        {
            throw new NotImplementedException();
        }

        private void InsertVisit(VisitInfo entity, SqlConnection conn, SqlTransaction tran)
        {
            entity.PriceSum = entity.Services.Sum(x => x.Price);

            var sqlCmd = String.Format("Insert into VisitInfo(EventId, PriceSum, XrayId) values({0},{1},{2})",entity.EventId, entity.PriceSum, entity.XrayId);

            var cmd = new SqlCommand(sqlCmd,conn,tran);

            cmd.ExecuteNonQuery();

        }

        private void InsertService(VisitService service, SqlConnection conn, SqlTransaction tran)
        {
            var sqlCmd = String.Format("Insert into VisitService(VisitId, ServiceId, ToothNum, ServicePrice, ServiceDescription, XrayId) values({0},{1},{2},{3},'{4}',{5})",
                service.VisitId, service.ServiceId, service.ToothNum, service.Price, service.Description, service.XrayId);

            var cmd = new SqlCommand(sqlCmd, conn, tran);

            cmd.ExecuteNonQuery();
        }

        private int GetVisitId(SqlConnection conn, SqlTransaction tran)
        {
            var sqlCmd = "SELECT IDENT_CURRENT('VisitInfo')";

            var cmd = new SqlCommand(sqlCmd, conn, tran);

            var res = (decimal)cmd.ExecuteScalar();

            return Decimal.ToInt32(res);
        }
    }
}