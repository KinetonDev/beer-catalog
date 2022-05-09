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
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace BeerCatalog.Application.Services;

public class BeerService : Service<BeerReadDto>, IBeerService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;

    public BeerService(
        IUnitOfWork unitOfWork,
        IMapper mapper,
        UserManager<User> userManager)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _userManager = userManager;
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

    public async Task<ServiceResult> CreateAsync(CreateBeerDto createBeerDto)
    {
        if (await _unitOfWork.BeersRepository.ExistsAsync(createBeerDto.Name))
        {
            return Error(ErrorCode.BeerAlreadyExists);
        }

        var json = JsonConvert.SerializeObject(createBeerDto, new JsonSerializerSettings
        {
            ContractResolver = new DefaultContractResolver
            {
                NamingStrategy = new SnakeCaseNamingStrategy()
            }
        });
        
        await _unitOfWork.BeersRepository.CreateWithJsonAsync(json);
        
        if (!(await _unitOfWork.BeersRepository.ExistsAsync(createBeerDto.Name)))
        {
            return Error(ErrorCode.BeerNotCreated);
        }

        return Success();
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

    public async Task<ServiceResult<IEnumerable<ReviewReadDto>>> GetReviewsById(Guid beerId)
    {
        var beer = await _unitOfWork.BeersRepository.FindByIdAsync(beerId);

        if (beer is null)
        {
            return new(ErrorCode.BeerNotFound);
        }

        var reviews = await _unitOfWork.BeerReviewRepository.GetAllByBeerId(beerId);

        var mappedReviews = _mapper.Map<IEnumerable<ReviewReadDto>>(reviews);

        return new(mappedReviews);
    }

    public async Task<ServiceResult> CreateReview(CreateReviewDto createReviewDto)
    {
        var beer = await _unitOfWork.BeersRepository.FindByIdAsync(createReviewDto.BeerId);

        if (beer is null)
        {
            return new(ErrorCode.BeerNotFound);
        }

        var user = await _userManager.FindByIdAsync(createReviewDto.UserId.ToString());

        if (user is null)
        {
            return new(ErrorCode.UserNotFound);
        }

        await _unitOfWork.BeerReviewRepository.CreateAsync(_mapper.Map<BeerReview>(createReviewDto));
        await _unitOfWork.SaveChangesAsync();

        return new ServiceResult();
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