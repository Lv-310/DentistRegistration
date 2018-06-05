using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DentistRegistration.Interfaces
{
    public interface IRepositoryCRUD<T>: IRepositoryCRU<T> where T : class
    {
        bool Delete(int id);
    }
}