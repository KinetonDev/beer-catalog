using System.Linq.Expressions;
using AutoMapper;
using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Application.Models;
using BeerCatalog.Application.Models.Beer;
using BeerCatalog.Domain.Models;
using BeerCatalog.Domain.Models.Beer;

namespace BeerCatalog.Application.Services;

public class BeerService : Service<BeerReadDto>, IBeerService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public BeerService(
        IUnitOfWork unitOfWork,
        IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task<ServiceResult<BeerReadDto>> GetByIdAsync(Guid id)
    {
        var beer = _mapper.Map<BeerReadDto>(await _unitOfWork.BeersRepository.FindByIdAsync(id));

        if (beer != null) return Result(beer);

        return Error(ErrorCode.BeerNotFound);
    }

    public async Task<ServiceResult<IEnumerable<BeerReadDto>>> GetAllAsync()
    {
        var beers = (await _unitOfWork.BeersRepository.AllAsync());
        
        var mappedBeers = _mapper.Map<IEnumerable<BeerReadDto>>(beers);
        
        return Result(mappedBeers);
    }

    public Task<ServiceResult> DeleteByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResult> UpdateByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<ServiceResult<BeerWithFavoriteMarkDto>> GetByIdWithFavoriteMarkAsync(Guid id, Guid userId)
    {
        var user = await _unitOfWork.UsersRepository.GetWithFavoritesByIdAsync(userId);

        if (user == null)
        {
            return new(ErrorCode.UserNotFound);
        }

        var beer = await _unitOfWork.BeersRepository.FindByIdAsync(id);

        if (beer == null)
        {
            return new(ErrorCode.BeerNotFound);
        }

        var mappedBeer = _mapper.Map<BeerWithFavoriteMarkDto>(beer);

        mappedBeer.IsFavorite = user.Favorites.Contains(beer);

        return new (mappedBeer);
    }

    public async Task<ServiceResult<ModelWithPagination<BeerWithFavoriteMarkDto>>> GetWithFavoriteMarkAndPaginationFilteredAsync(
        Guid userId,
        Pagination pagination,
        BeerFilter beerFilter)
    {
        var user = await _unitOfWork.UsersRepository.GetWithFavoritesByIdAsync(userId);

        if (user == null)
        {
            return new(ErrorCode.UserNotFound);
        }

        var beers = await _unitOfWork.BeersRepository.GetWithPaginationFilteredAsync(pagination, beerFilter);
        var totalBeerCount = await _unitOfWork.BeersRepository.CountAsync(beerFilter);

        var mappedBeers = AddFavoriteMark(beers, user);
        
        return new (new ModelWithPagination<BeerWithFavoriteMarkDto>
        {
            Collection = mappedBeers,
            TotalCount = totalBeerCount
        });
    }

    public async Task<ServiceResult<IEnumerable<BeerWithFavoriteMarkDto>>> GetAllWithFavoriteMarkAsync(Guid userId)
    {
        var user = await _unitOfWork.UsersRepository.GetWithFavoritesByIdAsync(userId);

        if (user == null)
        {
            return new(ErrorCode.UserNotFound);
        }
        
        var beers = await _unitOfWork.BeersRepository.AllAsync();

        var mappedBeers = AddFavoriteMark(beers, user);

        return new (mappedBeers);
    }

    private IEnumerable<BeerWithFavoriteMarkDto> AddFavoriteMark(IEnumerable<Beer> beers, User user)
    {
        return beers.Select(b =>
        {
            var mappedBeer = _mapper.Map<BeerWithFavoriteMarkDto>(b);
            mappedBeer.IsFavorite = user.Favorites.Contains(b);
            return mappedBeer;
        });
    }
}