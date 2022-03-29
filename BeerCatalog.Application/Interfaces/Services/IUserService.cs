using BeerCatalog.Application.Common;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Models;
using BeerCatalog.Application.Models.Beer;
using BeerCatalog.Domain.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace BeerCatalog.Application.Interfaces.Services;

public interface IUserService
{
    Task<ServiceResult<UserReadDto>> GetByIdAsync(Guid id);
    Task<ServiceResult<IEnumerable<UserReadDto>>> GetAllAsync();
    Task<ServiceResult> DeleteByIdAsync(Guid whoRequested, Guid userToDeleteId);
    Task<ServiceResult> PatchUserAsync(Guid whoRequested, Guid userToUpdateId,
        JsonPatchDocument<UserUpdateDto> patchDocument);
    Task<ServiceResult<IEnumerable<FavoriteBeerDto>>> GetFavoriteBeersAsync(Guid id);
    Task<ServiceResult<ModelWithPagination<FavoriteBeerDto>>> GetFavoriteBeersWithPaginationAsync(Guid id, Pagination pagination);
    Task<ServiceResult> AddFavoriteBeerByIdAsync(Guid userId, Guid beerId);
    Task<ServiceResult> RemoveFavoriteBeerByIdAsync(Guid userId, Guid beerId);
    Task<bool> IsInRoleAsync(Guid id, string role);
    Task<bool> CheckIfUserExistsByEmailAsync(string email);
    Task<bool> CheckIfUserExistsByUsernameAsync(string username);
}