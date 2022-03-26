using BeerCatalog.Application.Models;
using BeerCatalog.Domain.Models.Beer;

namespace BeerCatalog.Application.Interfaces.Repositories;

public interface IBeerRepository : IRepository<Beer>
{
    Task<IEnumerable<Beer>> GetWithPaginationFilteredAsync(Pagination pagination, BeerFilter beerFilter);
    Task<IEnumerable<Beer>> GetFavoritesByUserIdWithPaginationAsync(Guid userId, Pagination pagination);
    Task<int> CountOfFavoriteByUserIdAsync(Guid userId);
    Task<int> CountAsync(BeerFilter beerFilter);
}