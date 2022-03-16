namespace BeerCatalog.Application.Interfaces.Repositories;

public interface IRepository
{
    Task SaveChangesAsync();
}

public interface IRepository<T, in TKey> : IRepository where T : class
{
    Task<ICollection<T>> AllAsync();
    Task<T> FindByIdAsync(TKey id);
    Task<T> CreateAsync(T entity);
    Task<ICollection<T>> CreateManyAsync(ICollection<T> entities);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
}

public interface IRepository<T> : IRepository<T, Guid> where T : class
{
    
}