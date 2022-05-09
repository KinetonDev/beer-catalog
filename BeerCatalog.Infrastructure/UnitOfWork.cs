using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Domain.Models.Beer;
using BeerCatalog.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BeerCatalog.Infrastructure;

public class UnitOfWork : IUnitOfWork, IDisposable
{
    private readonly DbContext _dbContext;

    private IBeerRepository? _beerRepository;
    private IUserRepository? _userRepository;
    private IBeerReviewRepository? _beerReviewRepository;

    public UnitOfWork(DbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public IBeerRepository BeersRepository => _beerRepository ??= new BeerRepository(_dbContext);
    public IUserRepository UsersRepository => _userRepository ??= new UserRepository(_dbContext);
    public IBeerReviewRepository BeerReviewRepository => _beerReviewRepository ??= new BeerReviewRepository(_dbContext);
    
    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
    public void Dispose()
    {
        _dbContext.Dispose();
    }
}