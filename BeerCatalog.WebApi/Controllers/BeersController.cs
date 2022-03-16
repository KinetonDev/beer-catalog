using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerCatalog.WebApi.Controllers;

[ApiController]
[Route("beers")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class BeersController : ControllerBase
{
    [HttpGet]
    public IActionResult Secret()
    {
        return Ok("OkOkOk");
    }
}