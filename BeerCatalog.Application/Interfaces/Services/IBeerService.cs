using System.Linq.Expressions;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Models.Beer;
using BeerCatalog.Domain.Models.Beer;

namespace BeerCatalog.Application.Interfaces.Services;

public interface IBeerService
{
    Task<ServiceResult<BeerReadDto>> GetByIdAsync(Guid id);
    Task<ServiceResult<IEnumerable<BeerReadDto>>> GetAllAsync();
    Task<ServiceResult> DeleteByIdAsync(Guid id);
    Task<ServiceResult> UpdateByIdAsync(Guid id);
}