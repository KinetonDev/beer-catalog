using AutoMapper;
using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Application.Models;
using BeerCatalog.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace BeerCatalog.Application.Services;

public class UserService : Service<UserReadDto>, IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    public UserService(
        UserManager<User> userManager,
        IMapper mapper)
    {
        _userManager = userManager;
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