using System.Text;
using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Models;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Application.Models;
using BeerCatalog.Application.Models.Beer;
using BeerCatalog.WebApi.Controllers.Common;
using BeerCatalog.WebApi.DTO;
using BeerCatalog.WebApi.Helpers.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace BeerCatalog.WebApi.Controllers;

[ApiController]
[Route("api/v1/beers")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class BeersController : ControllerBaseClass
{
    private readonly IBeerService _beerService;
    private readonly IJwtTokenResolver _jwtTokenResolver;
    private readonly DbContext _context;

    public BeersController(
        IBeerService beerService,
        IJwtTokenResolver jwtTokenResolver,
        DbContext context)
    {
        _beerService = beerService;
        _jwtTokenResolver = jwtTokenResolver;
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] PaginationAndFilterDto paginationAndFilterDto)
    {
        var userId = GetUserIdFromAccessToken();

        if (CheckIfPaginationAndFilterIsNull(paginationAndFilterDto))
        {
            var retrievingResult = await _beerService.GetAllWithFavoriteMarkAsync(userId);
            return HandleServiceResult(retrievingResult);
        }
        else
        {
            var retrievingResult = await _beerService.GetWithFavoriteMarkAndPaginationFilteredAsync(userId,
                new ()
                {
                    Page = paginationAndFilterDto.Page,
                    PageSize = paginationAndFilterDto.PerPage
                }, new ()
                {
                    AbvGreaterThan = paginationAndFilterDto.AbvGreaterThan,
                    AbvLessThan = paginationAndFilterDto.AbvLessThan,
                    IbuGreaterThan = paginationAndFilterDto.IbuGreaterThan,
                    IbuLessThan = paginationAndFilterDto.IbuLessThan,
                    EbcGreaterThan = paginationAndFilterDto.EbcGreaterThan,
                    EbcLessThan = paginationAndFilterDto.EbcLessThan,
                    BeerName = paginationAndFilterDto.BeerName
                });

            return HandlePaginationServiceResult(retrievingResult);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        var userId = GetUserIdFromAccessToken();
        
        var retrievingResult = await _beerService.GetByIdWithFavoriteMarkAsync(id, userId);

        return HandleServiceResult(retrievingResult);
    }

    [HttpPost("parse")]
    [AllowAnonymous]
    public async Task<IActionResult> AddBeersFromPunkApi([FromServices]IHttpClientFactory factory, [FromQuery] int from, [FromQuery] int to)
    {
        var client = factory.CreateClient();
        for (int i = from; i <= to; i++)
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

        return Ok();
    }
    
    private Guid GetUserIdFromAccessToken()
    {
        var token = HttpContext.Request.Headers["Authorization"]
            .FirstOrDefault(token => token!.StartsWith("Bearer"))!
            .Split(" ")[1];

        return _jwtTokenResolver.GetUserIdFromToken(token!);
    }

    private static bool CheckIfPaginationAndFilterIsNull(PaginationAndFilterDto paginationAndFilterDto)
    {
        return !paginationAndFilterDto.Page.HasValue &&
               !paginationAndFilterDto.PerPage.HasValue &&
               !paginationAndFilterDto.AbvGreaterThan.HasValue &&
               !paginationAndFilterDto.AbvLessThan.HasValue &&
               !paginationAndFilterDto.EbcGreaterThan.HasValue &&
               !paginationAndFilterDto.EbcLessThan.HasValue &&
               !paginationAndFilterDto.IbuGreaterThan.HasValue &&
               !paginationAndFilterDto.IbuLessThan.HasValue;
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