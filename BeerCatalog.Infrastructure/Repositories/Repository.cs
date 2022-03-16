using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BeerCatalog.Infrastructure.Repositories;

public class Repository<T, TKey> : IRepository<T, TKey> where T: class
{
    private readonly AppDbContext _appDbContext;
    private readonly DbSet<T> _entities;

    public Repository(DbContext appDbContext)
    {
        _appDbContext = (appDbContext as AppDbContext) ?? 
                        throw new ArgumentException("Invalid type of dbContext is provided");

        _entities = _appDbContext.Set<T>(); 
    }
    
    public Task<ICollection<T>> AllAsync()
    {
        return null;
    }

    public Task<T> FindByIdAsync(TKey id)
    {
        throw new NotImplementedException();
    }

    public Task<T> CreateAsync(T entity)
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<T>> CreateManyAsync(ICollection<T> entities)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(T entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(T entity)
    {
        throw new NotImplementedException();
    }
    
    public Task SaveChangesAsync()
    {
        throw new NotImplementedException();
    }
}

public class Repository<T> : Repository<T, Guid>, IRepository<T> where T: class
{
    public Repository(DbContext appDbContext) : base(appDbContext)
    {
    }
}