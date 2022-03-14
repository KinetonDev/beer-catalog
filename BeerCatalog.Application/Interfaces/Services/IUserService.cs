using BeerCatalog.Application.Common;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Models;
using BeerCatalog.Domain.Models;

namespace BeerCatalog.Application.Interfaces.Services;

public interface IUserService
{
    Task<ServiceResult<UserReadDto>> GetByIdAsync(Guid id);
    Task<ServiceResult<IEnumerable<UserReadDto>>> GetAllAsync();
    Task<ServiceResult> DeleteByIdAsync(Guid id);
    Task<ServiceResult> UpdateByIdAsync(Guid id);
    Task<bool> IsInRoleAsync(Guid id, string role);
}