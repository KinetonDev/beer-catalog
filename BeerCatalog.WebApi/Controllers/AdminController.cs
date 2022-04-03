using BeerCatalog.Application.Common.Models;
using BeerCatalog.WebApi.Common.Authorization;
using BeerCatalog.WebApi.Controllers.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerCatalog.WebApi.Controllers;

[ApiController]
[Route("api/v1/admin")]
[Authorize(Policy = Policies.RequireAdminRole)]
public class AdminController : ControllerBaseClass
{

    [HttpGet]
    public IActionResult GetSomething()
    {
        return Ok("Admin detected");
    }
    
    protected override IActionResult ErrorResult(Error error)
    {
        throw new NotImplementedException();
    }
}