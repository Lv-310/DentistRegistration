using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DentistRegistration.Interfaces
{
    public interface IRepositoryCRU<T> where T : class
    {
        IEnumerable<T> GetAll();
        bool Insert(T entity);
        bool Update(T entity);
        T GetById(int id);
    }
}