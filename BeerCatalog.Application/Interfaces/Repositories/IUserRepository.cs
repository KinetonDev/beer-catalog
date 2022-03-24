using BeerCatalog.Domain.Models;

namespace BeerCatalog.Application.Interfaces.Repositories;

public interface IUserRepository
{
    Task<User?> GetWithFavoritesByIdAsync(Guid id);
}