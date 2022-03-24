using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Models;
using BeerCatalog.Application.Common.Service;
using Microsoft.AspNetCore.Mvc;

namespace BeerCatalog.WebApi.Controllers.Common;

public abstract class ControllerBaseClass : ControllerBase
{
    protected IActionResult HandleServiceResult(ServiceResult result)
    {
        if (result.Succeeded)
        {
            return Ok();
        }

        return ErrorResult(result.Error);
    }

    protected IActionResult HandleServiceResult<T>(ServiceResult<T> result)
    {
        if (result.Succeeded)
        {
            return Ok(result.Result);
        }

        return ErrorResult(result.Error);
    }

    protected abstract IActionResult ErrorResult(Error error);
}