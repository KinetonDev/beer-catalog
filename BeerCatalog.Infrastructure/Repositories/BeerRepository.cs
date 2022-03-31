using System.Linq.Expressions;
using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Application.Models;
using BeerCatalog.Domain.Models.Beer;
using BeerCatalog.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

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
            .OrderBy(b => b.Name)
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

    public async Task<IEnumerable<Beer>> GetWithPaginationFilteredAsync(Pagination pagination, BeerFilter filter)
    {
        var query = _dbContext.Beers
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
            .AsQueryable();
        
        
        query = ApplyFilters(query, b => 
                                 (filter.AbvGreaterThan.HasValue && b.Abv >= filter.AbvGreaterThan) &&
                                 (filter.EbcGreaterThan.HasValue && b.Ebc >= filter.EbcGreaterThan) &&
                                 (filter.IbuGreaterThan.HasValue && b.Ibu >= filter.IbuGreaterThan) &&
                                 (filter.AbvLessThan.HasValue && b.Abv <= filter.AbvLessThan) &&
                                 (filter.EbcLessThan.HasValue && b.Ebc <= filter.EbcLessThan) &&
                                 (filter.IbuLessThan.HasValue && b.Ibu <= filter.IbuLessThan) &&
                                 (b.Name.ToLower().Contains(string.IsNullOrEmpty(filter.BeerName) ? "" : filter.BeerName.ToLower())));
        
        query = query.OrderBy(b => b.Name);
      
        query = ApplyPagination(query, pagination.PageSize, pagination.Page);

        return await query.ToListAsync();
    }

    public async Task<IEnumerable<Beer>> GetFavoritesByUserIdWithPaginationAsync(Guid userId, Pagination pagination)
    {
        var query = _dbContext.Beers
            .Where(b => b.Fans.Any(u => u.Id == userId))
            .AsQueryable();
        
        query = query.OrderBy(b => b.Name);
        
        query = ApplyPagination(query, pagination.PageSize, pagination.Page);

        return await query.ToListAsync();
    }

    public async Task<int> CountOfFavoriteByUserIdAsync(Guid userId)
    {
        return await _dbContext.Beers
            .Where(b => b.Fans.Any(u => u.Id == userId))
            .CountAsync();
    }

    public async Task<int> CountAsync(BeerFilter filter)
    {
        var query = _dbContext.Beers.AsQueryable();

        query = ApplyFilters(query, b => 
            (filter.AbvGreaterThan.HasValue && b.Abv >= filter.AbvGreaterThan) &&
            (filter.EbcGreaterThan.HasValue && b.Ebc >= filter.EbcGreaterThan) &&
            (filter.IbuGreaterThan.HasValue && b.Ibu >= filter.IbuGreaterThan) &&
            (filter.AbvLessThan.HasValue && b.Abv <= filter.AbvLessThan) &&
            (filter.EbcLessThan.HasValue && b.Ebc <= filter.EbcLessThan) &&
            (filter.IbuLessThan.HasValue && b.Ibu <= filter.IbuLessThan) &&
            (b.Name.ToLower().Contains(string.IsNullOrEmpty(filter.BeerName) ? "" : filter.BeerName.ToLower())));
        
        return await query.CountAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }

    private IQueryable<Beer> ApplyPagination(IQueryable<Beer> query, int? pageSize, int? page)
    {
        return query.Skip((int)(pageSize.HasValue && page.HasValue ? (page - 1) * pageSize : 0)).Take(pageSize ?? int.MaxValue);
    }

    private IQueryable<Beer> ApplyFilters(IQueryable<Beer> query, Expression<Func<Beer, bool>> filter)
    {
        return query.Where(filter);
    }
}