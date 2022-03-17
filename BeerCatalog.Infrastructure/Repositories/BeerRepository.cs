using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Domain.Models.Beer;
using BeerCatalog.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BeerCatalog.Infrastructure.Repositories;

public class BeerRepository : IBeerRepository
{
    private readonly AppDbContext _dbContext;

    public BeerRepository(DbContext dbContext)
    {
        _dbContext = (dbContext as AppDbContext) ??
            throw new ArgumentException("Invalid type of dbContext was provided");
    }

    public async Task<IEnumerable<Beer>> AllAsync()
    {
        return await _dbContext.Beers
            .Include(b => b.Foods)
            .Include(b => b.Fermentation)
            .Include(b => b.Twist)
            .Include(b => b.Yeast)
            .Include(b => b.MashTemps)
            .Include(b => b.HopIngredients)
            .ThenInclude(hi => hi.Hop)
            .Include(b => b.HopIngredients)
            .ThenInclude(hi => hi.WhenToAdd)
            .Include(b => b.HopIngredients)
            .ThenInclude(hi => hi.Attribute)
            .Include(b => b.MaltIngredients)
            .ThenInclude(mi => mi.Malt)
            .ToListAsync();
    }

    public async Task<Beer?> FindByIdAsync(Guid id)
    {
        return await _dbContext.Beers
            .Include(b => b.Foods)
            .Include(b => b.Fermentation)
            .Include(b => b.Twist)
            .Include(b => b.Yeast)
            .Include(b => b.MashTemps)
            .Include(b => b.HopIngredients)
            .ThenInclude(hi => hi.Hop)
            .Include(b => b.HopIngredients)
            .ThenInclude(hi => hi.WhenToAdd)
            .Include(b => b.HopIngredients)
            .ThenInclude(hi => hi.Attribute)
            .Include(b => b.MaltIngredients)
            .ThenInclude(mi => mi.Malt)
            .FirstOrDefaultAsync(b => b.Id == id);
    }

    public Task<Beer> CreateAsync(Beer entity)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Beer>> CreateManyAsync(IEnumerable<Beer> entities)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(Beer entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(Beer entity)
    {
        throw new NotImplementedException();
    }
    
    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}