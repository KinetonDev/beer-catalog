using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Models;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Application.Models;
using BeerCatalog.Domain.Models;
using BeerCatalog.WebApi.Controllers.Common;
using BeerCatalog.WebApi.DTO;
using BeerCatalog.WebApi.Helpers.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace BeerCatalog.WebApi.Controllers;

[ApiController]
[Route("api/v1/users")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class UsersController : ControllerBaseClass
{
    private readonly IJwtTokenResolver _jwtTokenResolver;
    private readonly IUserService _userService;

    public UsersController(
        IJwtTokenResolver jwtTokenResolver,
        IUserService userService)
    {
        this._jwtTokenResolver = jwtTokenResolver;
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var retrievingResult = await _userService.GetAllAsync();

        return HandleServiceResult(retrievingResult);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var retrievingResult = await _userService.GetByIdAsync(id);

        return HandleServiceResult(retrievingResult);
    }
    
    [HttpGet("me")]
    public async Task<IActionResult> GetMe()
    {
        var userId = GetUserIdFromAccessToken();
        
        var retrievingResult = await _userService.GetWithRoleById(userId);

        return HandleServiceResult(retrievingResult);
    }

    [HttpPatch("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] JsonPatchDocument<UserUpdateDto> updateDto)
    {
        var userId = GetUserIdFromAccessToken();
        
        var updatingResult = await _userService.PatchUserAsync(userId, id, updateDto);

        return HandleServiceResult(updatingResult);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteById(Guid id)
    {
        var userId = GetUserIdFromAccessToken();

        var deletionResult = await _userService.DeleteByIdAsync(userId, id);

        return HandleServiceResult(deletionResult);
    }

    [AllowAnonymous]
    [HttpGet("check-email/{email}")]
    public async Task<IActionResult> CheckIfUserExistsByEmail(string email)
    {
        var exists = await _userService.CheckIfUserExistsByEmailAsync(email);

        return exists ? Ok() : NotFound();
    }
    
    [AllowAnonymous]
    [HttpGet("check-username/{username}")]
    public async Task<IActionResult> CheckIfUserExistsByUsername(string username)
    {
        var exists = await _userService.CheckIfUserExistsByUsernameAsync(username);

        return exists ? Ok() : NotFound();
    }

    [HttpPut("change-avatar")]
    public async Task<IActionResult> ChangeAvatar([FromBody] ChangeAvatarDto changeAvatarDto)
    {
        var userId = GetUserIdFromAccessToken();
        
        var changingResult = await _userService.ChangeUserAvatarAsync(userId, changeAvatarDto);

        return HandleServiceResult(changingResult);
    }

    private Guid GetUserIdFromAccessToken()
    {
        var token = HttpContext.Request.Headers["Authorization"]
            .FirstOrDefault(token => token!.StartsWith("Bearer"))!
            .Split(" ")[1];

        return _jwtTokenResolver.GetUserIdFromToken(token!);
    }
    
    private async Task<bool> IsAllowedToDeleteAccount(Guid id)
    {
        var userId = GetUserIdFromAccessToken();

        if (userId == id)
        {
            return true;
        }

        var userRetrievingResult = await _userService.GetByIdAsync(userId);

        if (!userRetrievingResult.Succeeded)
        {
            return false;
        }

        return await _userService.IsInRoleAsync(userRetrievingResult.Result!.Id, "Admin");
    }

    protected override IActionResult ErrorResult(Error error)
    {
        var errorCode = error.ErrorCode;

        if (errorCode is ErrorCode.UserNotFound)
        {
            return NotFound(error);
        }

        return BadRequest(error);
    }
}