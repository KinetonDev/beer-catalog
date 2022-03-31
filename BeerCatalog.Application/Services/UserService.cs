using System.Buffers.Text;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Interfaces.Cloud;
using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Application.Models;
using BeerCatalog.Application.Models.Beer;
using BeerCatalog.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Exceptions;

namespace BeerCatalog.Application.Services;

public class UserService : Service<UserReadDto>, IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly IRemoteStorage _remoteStorage;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public UserService(
        UserManager<User> userManager,
        IRemoteStorage remoteStorage,
        IUnitOfWork unitOfWork,
        IMapper mapper)
    {
        _userManager = userManager;
        _remoteStorage = remoteStorage;
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

    public async Task<ServiceResult> DeleteByIdAsync(Guid whoRequested, Guid userToDeleteId)
    {
        var user = await _userManager.FindByIdAsync(whoRequested.ToString());

        if (user == null)
        {
            return Error(ErrorCode.UserNotFound);
        }

        if (!(await IsAllowedToOperate(whoRequested, userToDeleteId)))
        {
            return Error(ErrorCode.NotAllowedToDeleteAccount);
        }

        var userToDelete = await _userManager.FindByIdAsync(userToDeleteId.ToString());

        if (userToDelete == null)
        {
            return Error(ErrorCode.UserNotFound);
        }
        
        var deletionResult = await _userManager.DeleteAsync(user);

        return !deletionResult.Succeeded ? Error(ErrorCode.UserNotDeleted) : Success();
    }

    public async Task<ServiceResult> PatchUserAsync(Guid whoRequested, Guid userToUpdateId, JsonPatchDocument<UserUpdateDto> patchDocument)
    {
        var user = await _userManager.FindByIdAsync(whoRequested.ToString());

        if (user == null)
        {
            return Error(ErrorCode.UserNotFound);
        }

        if (!(await IsAllowedToOperate(whoRequested, userToUpdateId)))
        {
            return Error(ErrorCode.NotAllowedToUpdateAccount);
        }

        var userToUpdate = await _userManager.FindByIdAsync(userToUpdateId.ToString());

        if (userToUpdate == null)
        {
            return Error(ErrorCode.UserNotFound);
        }

        var userToUpdateDto = _mapper.Map<UserUpdateDto>(userToUpdate);

        try
        {
            patchDocument.ApplyTo(userToUpdateDto);
        }
        catch (JsonPatchException e)
        {
            return Error(ErrorCode.UserNotUpdated);
        }

        _mapper.Map(userToUpdateDto, userToUpdate);
        var results = new List<ValidationResult>();

        if (!Validator.TryValidateObject(userToUpdate, new ValidationContext(userToUpdate), results, true))
        {
            return Error(ErrorCode.ValidationFailed);
        }

        var updatingResult = await _userManager.UpdateAsync(userToUpdate);

        if (!updatingResult.Succeeded)
        {
            return Error(ErrorCode.UserNotUpdated);
        }

        return Success();
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

    public async Task<ServiceResult<Avatar>> ChangeUserAvatarAsync(Guid id, ChangeAvatarDto changeAvatarDto)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());

        if (user == null)
        {
            return new(ErrorCode.UserNotFound);
        }

        if (!string.IsNullOrEmpty(user.AvatarUrl))
        {
            await _remoteStorage.DeleteFileAsync(id);
            user.AvatarUrl = null;
        }
        
        MemoryStream memoryStream;
        
        try
        {
            memoryStream = new MemoryStream(
                Convert.FromBase64String(changeAvatarDto.AvatarBase64));
        }
        catch (Exception e)
        {
            return new(ErrorCode.InvalidBase64);
        }

        try
        {
            var avatarLink = await _remoteStorage.UploadFileAsync(id, memoryStream);

            user.AvatarUrl = avatarLink;
            
            var updatingResult = await _userManager.UpdateAsync(user);

            if (!updatingResult.Succeeded)
            {
                return new(ErrorCode.UserNotUpdated);
            }

            return new (new Avatar
            {
                Url = avatarLink
            });
        }
        catch (Exception e)
        {
            return new (ErrorCode.UserNotUpdated);
        }
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
    
    private async Task<bool> IsAllowedToOperate(Guid whoRequested, Guid userToOperateId)
    {
        if (whoRequested == userToOperateId)
        {
            return true;
        }
        
        return await IsInRoleAsync(whoRequested, "Admin");
    }
}