using System.Collections.Generic;


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