using System.Linq.Expressions;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Models;
using BeerCatalog.Application.Models.Beer;
using BeerCatalog.Domain.Models.Beer;

namespace BeerCatalog.Application.Interfaces.Services;

public interface IBeerService
{
    Task<ServiceResult<BeerReadDto>> GetByIdAsync(Guid id);
    Task<ServiceResult<IEnumerable<BeerReadDto>>> GetAllAsync();
    Task<ServiceResult> DeleteByIdAsync(Guid id);
    Task<ServiceResult> UpdateByIdAsync(Guid id);
    Task<ServiceResult> CreateAsync(CreateBeerDto createBeerDto);
    Task<ServiceResult<BeerWithFavoriteMarkDto>> GetByIdWithFavoriteMarkAsync(Guid id, Guid userId);
    Task<ServiceResult<ModelWithPagination<BeerWithFavoriteMarkDto>>> GetWithFavoriteMarkAndPaginationFilteredAsync(
        Guid userId,
        Pagination pagination,
        BeerFilter beerFilter);
    Task<ServiceResult<IEnumerable<BeerWithFavoriteMarkDto>>> GetAllWithFavoriteMarkAsync(Guid userId);
    Task<ServiceResult<IEnumerable<ReviewReadDto>>> GetReviewsById(Guid beerId);
    Task<ServiceResult> CreateReview(CreateReviewDto createReviewDto);
}