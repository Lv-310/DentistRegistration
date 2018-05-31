using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DentistRegistration.Interfaces
{
    public interface IRepositoryCRUcollection<T>:IRepositoryCRU<T> where T : class
    {
        IEnumerable<T> GetByTiedId(int id);
        //IQueryable<T> GetByTiedId(int id);
    }
}