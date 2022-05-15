using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Models;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Application.Models;
using BeerCatalog.WebApi.Controllers.Common;
using BeerCatalog.WebApi.Helpers.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerCatalog.WebApi.Controllers;

[ApiController]
[Route("api/v1/reviews")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class ReviewsController : ControllerBaseClass
{
    private readonly IBeerService _beerService;
    private readonly IJwtTokenResolver _jwtTokenResolver;

    public ReviewsController(
        IBeerService beerService,
        IJwtTokenResolver jwtTokenResolver)
    {
        _beerService = beerService;
        _jwtTokenResolver = jwtTokenResolver;
    }

    [HttpGet("{beerId:guid}")]
    public async Task<IActionResult> GetAllByBeerId(Guid beerId)
    {
        var reviewsRetrievingResult = await _beerService.GetReviewsByIdAsync(beerId);

        return HandleServiceResult(reviewsRetrievingResult);
    }
    
    [HttpPost]
    public async Task<IActionResult> AddReview(CreateReviewDto createReviewDto)
    {
        var creatingReviewResult = await _beerService.CreateReviewAsync(createReviewDto);

        return HandleServiceResult(creatingReviewResult);
    }

    [HttpDelete("{reviewId:guid}")]
    public async Task<IActionResult> RemoveReview([FromRoute] Guid reviewId)
    {
        var userId = GetUserIdFromAccessToken();
        
        var deletingResult = await _beerService.DeleteReviewAsync(reviewId, userId);

        return HandleServiceResult(deletingResult);
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

        if (errorCode is ErrorCode.UserNotFound or ErrorCode.BeerNotFound)
        {
            return NotFound(error);
        }

        return BadRequest(error);
    }
}