using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Models;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.WebApi.Controllers.Common;
using BeerCatalog.WebApi.DTO;
using BeerCatalog.WebApi.Helpers.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerCatalog.WebApi.Controllers;

[ApiController]
[Route("favorites")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class FavoritesController : ControllerBaseClass
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
    
    [HttpGet("{userId:guid}")]
    public async Task<IActionResult> GetFavoriteBeers(Guid userId)
    {
        var favoritesResult = await _userService.GetFavoriteBeersAsync(userId);

        return HandleServiceResult(favoritesResult);
    }

    [HttpPost]
    public async Task<IActionResult> AddFavoriteBeer([FromBody]AddFavoriteBeerDto dto)
    {
        var userId = GetUserIdFromAccessToken();

        var addingResult = await _userService.AddFavoriteBeerByIdAsync(userId, dto.BeerId);

        return HandleServiceResult(addingResult);
    }

    [HttpDelete("{beerId:guid}")]
    public async Task<IActionResult> RemoveFavoriteBeer(Guid beerId)
    {
        var userId = GetUserIdFromAccessToken();

        var removingResult = await _userService.RemoveFavoriteBeerByIdAsync(userId, beerId);

        return HandleServiceResult(removingResult);
    }
    
    private Guid GetUserIdFromAccessToken()
    {
        var token = HttpContext.Request.Headers["Authorization"]
            .FirstOrDefault(token => token!.StartsWith("Bearer"))!
            .Split(" ")[1];

        return _jwtTokenResolver.GetUserIdFromToken(token!);
    }

    protected override IActionResult ErrorResult(Error error)
    {
        var errorCode = error.ErrorCode;
        
        if (errorCode is ErrorCode.BeerNotFound or ErrorCode.UserNotFound)
        {
            return NotFound(error);
        }

        return BadRequest(error);
    }
}