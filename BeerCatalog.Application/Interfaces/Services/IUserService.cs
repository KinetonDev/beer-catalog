using BeerCatalog.Application.Common;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Models;
using BeerCatalog.Application.Models.Beer;
using BeerCatalog.Domain.Models;

namespace BeerCatalog.Application.Interfaces.Services;

public interface IUserService
{
    Task<ServiceResult<UserReadDto>> GetByIdAsync(Guid id);
    Task<ServiceResult<IEnumerable<UserReadDto>>> GetAllAsync();
    Task<ServiceResult> DeleteByIdAsync(Guid id);
    Task<ServiceResult> UpdateByIdAsync(Guid id);
    Task<ServiceResult<IEnumerable<FavoriteBeerDto>>> GetFavoriteBeersAsync(Guid id);
    Task<ServiceResult> AddFavoriteBeerByIdAsync(Guid userId, Guid beerId);
    Task<bool> IsInRoleAsync(Guid id, string role);
    Task<bool> CheckIfUserExistsByEmailAsync(string email);
    Task<bool> CheckIfUserExistsByUsernameAsync(string username);
}