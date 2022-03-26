using BeerCatalog.Domain.Models;

namespace BeerCatalog.Application.Interfaces.Repositories;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetWithFavoritesByIdAsync(Guid id);
}