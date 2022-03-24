using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.WebApi.DTO;
using BeerCatalog.WebApi.Helpers.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerCatalog.WebApi.Controllers;

[ApiController]
[Route("favorites")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class FavoritesController : ControllerBase
{
    private readonly IJwtTokenResolver _jwtTokenResolver;
    private readonly IUserService _userService;

    public FavoritesController(
        IJwtTokenResolver jwtTokenResolver,
        IUserService userService)
    {
        _jwtTokenResolver = jwtTokenResolver;
        _userService = userService;
    }
    
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetFavoriteBeers(Guid userId)
    {
        var favoritesResult = await _userService.GetFavoriteBeersAsync(userId);
        
        if (favoritesResult.Succeeded)
        {
            return Ok(favoritesResult.Result);
        }
        
        return BadRequest(favoritesResult.Error);
    }

    [HttpPost]
    public async Task<IActionResult> AddFavoriteBeer([FromBody]AddFavoriteBeerDto dto)
    {
        var userId = GetUserIdFromAccessToken();

        var addingResult = await _userService.AddFavoriteBeerByIdAsync(userId, dto.BeerId);

        if (addingResult.Succeeded)
        {
            return Ok();
        }

        var errorCode = addingResult.Error.ErrorCode;

        if (errorCode is ErrorCode.BeerNotFound or ErrorCode.UserNotFound)
        {
            return NotFound(addingResult.Error);
        }

        return BadRequest(addingResult.Error);
    }
    
    private Guid GetUserIdFromAccessToken()
    {
        var token = HttpContext.Request.Headers["Authorization"]
            .FirstOrDefault(token => token!.StartsWith("Bearer"))!
            .Split(" ")[1];

        return _jwtTokenResolver.GetUserIdFromToken(token!);
    }
}