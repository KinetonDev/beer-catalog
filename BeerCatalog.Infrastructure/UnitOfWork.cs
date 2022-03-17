using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Domain.Models.Beer;
using BeerCatalog.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BeerCatalog.Infrastructure;

public class UnitOfWork : IUnitOfWork, IDisposable
{
    private readonly DbContext _dbContext;

    private IBeerRepository? _beerRepository;

    public UnitOfWork(DbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public IBeerRepository BeersRepository => _beerRepository ??= new BeerRepository(_dbContext);
    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
    public void Dispose()
    {
        _dbContext.Dispose();
    }
}