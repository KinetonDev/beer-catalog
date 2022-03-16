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
    
    public async Task<IEnumerable<T>> AllAsync()
    {
        return await _entities.AsNoTracking().ToListAsync();
    }

    public async Task<T?> FindByIdAsync(TKey id)
    {
        return await _entities.FindAsync(id);
    }

    public async Task<T> CreateAsync(T entity)
    {
        return (await _entities.AddAsync(entity)).Entity;
    }

    public async Task<IEnumerable<T>> CreateManyAsync(IEnumerable<T> entities)
    {
        var entitiesList = entities.ToList();
        await _entities.AddRangeAsync(entitiesList);

        return entitiesList;
    }

    public Task UpdateAsync(T entity)
    {
        return Task.Run(() =>
        {
            _entities.Update(entity);
        });
    }

    public Task DeleteAsync(T entity)
    {
        return Task.Run(() =>
        {
            _entities.Remove(entity);
        });
    }
    
    public async Task SaveChangesAsync()
    {
        await _appDbContext.SaveChangesAsync();
    }
}

public class Repository<T> : Repository<T, Guid>, IRepository<T> where T: class
{
    public Repository(DbContext appDbContext) : base(appDbContext)
    {
    }
}