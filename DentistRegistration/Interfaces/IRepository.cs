using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DentistRegistration.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAllDoctors();
        bool InsertDoctor(T entity);
        bool UpdateDoctor(T entity);
        T GetDoctorById(int id);
    }
}