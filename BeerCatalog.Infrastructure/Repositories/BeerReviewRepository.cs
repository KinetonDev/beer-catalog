using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Domain.Models.Beer;
using BeerCatalog.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BeerCatalog.Infrastructure.Repositories;

public class BeerReviewRepository : IBeerReviewRepository
{
    private readonly AppDbContext _dbContext;

    public BeerReviewRepository(DbContext dbContext)
    {
        _dbContext = (dbContext as AppDbContext) ?? 
                     throw new ArgumentException("Invalid type of dbContext was provided");;
    }
    
    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }

    public Task<IEnumerable<BeerReview>> AllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<BeerReview?> FindByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task CreateAsync(BeerReview entity)
    {
        await _dbContext.Reviews.AddAsync(entity);
    }

    public Task<IEnumerable<BeerReview>> CreateManyAsync(IEnumerable<BeerReview> entities)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(BeerReview entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(BeerReview entity)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<BeerReview>> GetAllByBeerId(Guid beerId)
    {
        return await _dbContext.Reviews
            .AsNoTracking()
            .Include(a => a.User)
            .Where(r => r.BeerId == beerId)
            .OrderByDescending(r => r.PostedOn)
            .ToListAsync();
    }
}