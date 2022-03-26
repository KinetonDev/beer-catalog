using AutoMapper;
using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Application.Models;
using BeerCatalog.Application.Models.Beer;
using BeerCatalog.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace BeerCatalog.Application.Services;

public class UserService : Service<UserReadDto>, IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public UserService(
        UserManager<User> userManager,
        IUnitOfWork unitOfWork,
        IMapper mapper)
    {
        _userManager = userManager;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ServiceResult<UserReadDto>> GetByIdAsync(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());

        return user == null ? Error(ErrorCode.UserNotFound) : Result(_mapper.Map<UserReadDto>(user));
    }

    public Task<ServiceResult<IEnumerable<UserReadDto>>> GetAllAsync()
    {
        return Task.FromResult(Result(_mapper.Map<IEnumerable<UserReadDto>>(_userManager.Users)));
    }

    public async Task<ServiceResult> DeleteByIdAsync(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());

        if (user == null)
        {
            return Error(ErrorCode.UserNotFound);
        }

        var deletionResult = await _userManager.DeleteAsync(user);

        return !deletionResult.Succeeded ? Error(ErrorCode.UserNotDeleted) : Success();
    }

    public Task<ServiceResult> UpdateByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<ServiceResult<IEnumerable<FavoriteBeerDto>>> GetFavoriteBeersAsync(Guid id)
    {
        var user = await _unitOfWork.UsersRepository.GetWithFavoritesByIdAsync(id);

        if (user == null)
        {
            return new (ErrorCode.UserNotFound);
        }
        
        var favorites = user.Favorites;

        return new ServiceResult<IEnumerable<FavoriteBeerDto>>(_mapper.Map<IEnumerable<FavoriteBeerDto>>(favorites));
    }

    public async Task<ServiceResult<ModelWithPagination<FavoriteBeerDto>>> GetFavoriteBeersWithPaginationAsync(Guid id, Pagination pagination)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());

        if (user == null)
        {
            return new (ErrorCode.UserNotFound);
        }

        var favorites = await _unitOfWork.BeersRepository.GetFavoritesByUserIdWithPaginationAsync(id, pagination);
        var totalCount = await _unitOfWork.BeersRepository.CountOfFavoriteByUserIdAsync(id);

        var mappedBeers = _mapper.Map<IEnumerable<FavoriteBeerDto>>(favorites);

        return new(new ModelWithPagination<FavoriteBeerDto>
        {
            Collection = mappedBeers,
            TotalCount = totalCount
        });
    }

    public async Task<ServiceResult> AddFavoriteBeerByIdAsync(Guid userId, Guid beerId)
    {
        var user = await _unitOfWork.UsersRepository.GetWithFavoritesByIdAsync(userId);

        if (user == null)
        {
            return new (ErrorCode.UserNotFound);
        }

        var beer = await _unitOfWork.BeersRepository.FindByIdAsync(beerId);

        if (beer == null)
        {
            return new (ErrorCode.BeerNotFound);
        }

        if (user.Favorites.Contains(beer))
        {
            return new(ErrorCode.BeerIsAlreadyMarkedAsFavorite);
        }
        
        user.Favorites.Add(beer);

        await _unitOfWork.SaveChangesAsync();

        return Success();
    }

    public async Task<ServiceResult> RemoveFavoriteBeerByIdAsync(Guid userId, Guid beerId)
    {
        var user = await _unitOfWork.UsersRepository.GetWithFavoritesByIdAsync(userId);

        if (user == null)
        {
            return new (ErrorCode.UserNotFound);
        }

        var beer = await _unitOfWork.BeersRepository.FindByIdAsync(beerId);

        if (beer == null)
        {
            return new (ErrorCode.BeerNotFound);
        }

        if (!user.Favorites.Contains(beer))
        {
            return new(ErrorCode.BeerIsNotMarkedAsFavorite);
        }
        
        user.Favorites.Remove(beer);

        await _unitOfWork.SaveChangesAsync();

        return Success();
    }

    public async Task<bool> IsInRoleAsync(Guid id, string role)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());

        if (user == null)
        {
            return false;
        }
        
        return await _userManager.IsInRoleAsync(user, role);
    }

    public async Task<bool> CheckIfUserExistsByEmailAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        return user != null;
    }

    public async Task<bool> CheckIfUserExistsByUsernameAsync(string username)
    {
        var user = await _userManager.FindByNameAsync(username);

        return user != null;
    }
}