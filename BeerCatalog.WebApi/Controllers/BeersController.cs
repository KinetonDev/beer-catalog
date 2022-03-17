using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Domain.Models.Beer;
using BeerCatalog.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BeerCatalog.WebApi.Controllers;

[ApiController]
[Route("beers")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class BeersController : ControllerBase
{
    private readonly IBeerService _beerService;
    private readonly DbContext _context;

    public BeersController(IBeerService beerService, DbContext context)
    {
        _beerService = beerService;
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var retrievingResult = await _beerService.GetAllAsync();

        if (retrievingResult.Succeeded)
        {
            return Ok(retrievingResult.Result);
        }

        return BadRequest(retrievingResult.Error);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetAll([FromRoute] Guid id)
    {
        var retrievingResult = await _beerService.GetByIdAsync(id);

        if (retrievingResult.Succeeded)
        {
            return Ok(retrievingResult.Result);
        }

        return BadRequest(retrievingResult.Error);
    }
}