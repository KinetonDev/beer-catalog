using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BeerCatalog.Infrastructure;

public class UnitOfWork : IUnitOfWork
{
    private readonly DbContext _dbContext;

    private IRepository<Beer>? _beerRepository;

    public UnitOfWork(DbContext dbContext)
    {
        _dbContext = dbContext;
    }


    public IRepository<Beer> BeersRepository => _beerRepository ??= new Repository<Beer>(_dbContext);
}