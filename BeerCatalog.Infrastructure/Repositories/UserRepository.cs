using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Domain.Models;
using BeerCatalog.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BeerCatalog.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _dbContext;

    public UserRepository(DbContext dbContext)
    {
        _dbContext = dbContext as AppDbContext
                     ?? throw new ArgumentException("Invalid type of dbContext was provided");
    }
    
    public async Task<User?> GetWithFavoritesByIdAsync(Guid id)
    {
        return await _dbContext.Users
            .Include(u => u.Favorites)
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }

    public Task<IEnumerable<User>> AllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<User?> FindByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<User> CreateAsync(User entity)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<User>> CreateManyAsync(IEnumerable<User> entities)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(User entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(User entity)
    {
        throw new NotImplementedException();
    }
}