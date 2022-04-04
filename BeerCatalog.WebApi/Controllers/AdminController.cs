using BeerCatalog.Application.Common.Models;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Application.Models.Beer;
using BeerCatalog.WebApi.Common.Authorization;
using BeerCatalog.WebApi.Controllers.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace BeerCatalog.WebApi.Controllers;

[ApiController]
[Route("api/v1/admin")]
[Authorize(Policy = Policies.RequireAdminRole)]
public class AdminController : ControllerBaseClass
{
    private readonly IBeerService _beerService;

    public AdminController(
        IBeerService beerService
        )
    {
        _beerService = beerService;
    }

    [HttpPost("create-beer")]
    public async Task<IActionResult> CreateBeer(CreateBeerDto createBeerDto)
    {
        var creatingResult = await _beerService.CreateAsync(createBeerDto);
        
        return HandleServiceResult(creatingResult);
    }
}