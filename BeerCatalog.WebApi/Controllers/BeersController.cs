using System.Text;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Domain.Models.Beer;
using BeerCatalog.Infrastructure;
using BeerCatalog.WebApi.DTO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

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
    public async Task<IActionResult> GetAll([FromQuery] PaginationAndFilterDto paginationDto)
    {
        var retrievingResult = await _beerService.GetAllAsync();

        if (retrievingResult.Succeeded)
        {
            return Ok(retrievingResult.Result);
        }

        return BadRequest(retrievingResult.Error);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        var retrievingResult = await _beerService.GetByIdAsync(id);

        if (retrievingResult.Succeeded)
        {
            return Ok(retrievingResult.Result);
        }

        return BadRequest(retrievingResult.Error);
    }

    
    [HttpPost("parse")]
    [AllowAnonymous]
    public async Task<IActionResult> AddBeersFromPunkApi([FromServices]IHttpClientFactory factory)
    {
        var client = factory.CreateClient();
        for (int i = 3; i < 20; i++)
        {
            if (i != 1 && i != 2 && i != 12)
            {
                var response = await client.GetAsync($"https://api.punkapi.com/v2/beers/{i}");
                var responseBody = await response.Content.ReadAsStringAsync();
                var stringBuilder = new StringBuilder(responseBody);
                stringBuilder.Replace("'", "''");
                stringBuilder.Remove(stringBuilder.Length - 1, 1);
                stringBuilder.Remove(0, 1);
                try
                {
                    var obj = JToken.Parse(stringBuilder.ToString());
                }
                catch (Exception e)
                {
                    return BadRequest();
                }
                SqlParameter param = new ("@json", stringBuilder.ToString());
                await _context.Database.ExecuteSqlRawAsync($"ParseJsonData @json", param);
            }
        }

        return Ok();
    }
}