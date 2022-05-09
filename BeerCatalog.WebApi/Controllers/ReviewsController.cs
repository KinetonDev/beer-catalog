using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Models;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Application.Models;
using BeerCatalog.WebApi.Controllers.Common;
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

    public ReviewsController(IBeerService beerService)
    {
        _beerService = beerService;
    }

    [HttpGet("{beerId:guid}")]
    public async Task<IActionResult> GetAllByBeerId(Guid beerId)
    {
        var reviewsRetrievingResult = await _beerService.GetReviewsById(beerId);

        return HandleServiceResult(reviewsRetrievingResult);
    }
    
    [HttpPost]
    public async Task<IActionResult> AddReview(CreateReviewDto createReviewDto)
    {
        var creatingReviewResult = await _beerService.CreateReview(createReviewDto);

        return HandleServiceResult(creatingReviewResult);
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