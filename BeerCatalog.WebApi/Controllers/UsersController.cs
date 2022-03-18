using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.WebApi.Helpers.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerCatalog.WebApi.Controllers;

[ApiController]
[Route("users")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class UsersController : ControllerBase
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

        if (retrievingResult.Succeeded)
        {
            return Ok(retrievingResult.Result);
        }

        return BadRequest(retrievingResult.Error);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var isIdValidGuid = Guid.TryParse(id, out var guid);

        if (!isIdValidGuid)
        {
            return BadRequest("Invalid guid");
        }
        
        var retrievingResult = await _userService.GetByIdAsync(guid);

        if (retrievingResult.Succeeded)
        {
            return Ok(retrievingResult.Result);
        }
        
        if (retrievingResult.Error.ErrorCode == ErrorCode.UserNotFound)
        {
            return NotFound(retrievingResult.Error);
        }

        return BadRequest(retrievingResult.Error);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteById(string id)
    {
        var isIdValidGuid = Guid.TryParse(id, out var guid);

        if (!isIdValidGuid)
        {
            return BadRequest("Invalid guid");
        }

        if (!(await IsAllowedToDeleteAccount(guid)))
            return BadRequest("Not allowed to delete this user");

        var deletionResult = await _userService.DeleteByIdAsync(guid);

        if (deletionResult.Succeeded)
        {
            return Ok();
        }

        return BadRequest(deletionResult.Error);
    }

    [HttpGet]
    public async Task<IActionResult> CheckIfUserExistsByEmail()
    {
        throw new NotImplementedException();
    }
    
    [HttpGet]
    public async Task<IActionResult> CheckIfUserExistsByUsername()
    {
        throw new NotImplementedException();
    }
    
    private async Task<bool> IsAllowedToDeleteAccount(Guid id)
    {
        var token = HttpContext.Request.Headers["Authorization"]
            .FirstOrDefault(token => token!.StartsWith("Bearer"))!
            .Split(" ")[1];

        var userId = _jwtTokenResolver.GetUserIdFromToken(token!);

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
}