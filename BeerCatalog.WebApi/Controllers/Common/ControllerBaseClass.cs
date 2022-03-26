using BeerCatalog.Application.Common.Enums;
using BeerCatalog.Application.Common.Models;
using BeerCatalog.Application.Common.Service;
using BeerCatalog.Application.Models;
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

    protected IActionResult HandleServiceResult<T>(ServiceResult<T> result) where T: class
    {
        if (result.Succeeded)
        {
            return Ok(result.Result);
        }

        return ErrorResult(result.Error);
    }

    protected IActionResult HandlePaginationServiceResult<T>(ServiceResult<ModelWithPagination<T>> result) where T: class
    {
        if (result.Result is null)
        {
            throw new ArgumentException("Result can't be null");
        }
        
        if (result.Succeeded)
        {
            SetPaginationHeader(result.Result.TotalCount);
            return HandleServiceResult(new ServiceResult<IEnumerable<T>>(result.Result.Collection));
        }

        return HandleServiceResult(result);
    }

    protected abstract IActionResult ErrorResult(Error error);

    protected void SetPaginationHeader(int totalCount)
    {
        Response.Headers.Add("x-total-count", totalCount.ToString());
    }
}