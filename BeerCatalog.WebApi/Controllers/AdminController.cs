using System.Net.Mime;
using System.Text;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Application.Models.Beer;
using BeerCatalog.WebApi.Common.Authorization;
using BeerCatalog.WebApi.Controllers.Common;
using IronPdf;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

    [HttpGet("reviewsPdf/{beerId:guid}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetBeerReviewsPdf(Guid beerId)
    {
        var beerResult = await _beerService.GetByIdAsync(beerId);

        if (!beerResult.Succeeded)
        {
            return BadRequest(beerResult.Error);
        }
        
        var reviewsResult = await _beerService.GetReviewsByIdAsync(beerId);

        if (!reviewsResult.Succeeded)
        {
            return BadRequest(reviewsResult.Error);
        }

        var reviewsHtml = new StringBuilder();

        foreach (var review in reviewsResult.Result!)
        {
            reviewsHtml.Append(@$"
<div style=""margin:15px 0"">
{review.Username} - {review.PostedOn}
<div>
<div>Description : {review.Description}</div>
<div>Rating : {review.Rating}</div>
</div> 
</div>
");
        }
        
        var renderer = new ChromePdfRenderer();
        using var pdf = await renderer.RenderHtmlAsPdfAsync(@$"
<!DOCTYPE html>
<html>
<head>
	<title>Parcel Sandbox</title>
	<meta charset='UTF-8' />
</head>
<body>
	<div>
    <h1>Beer id: {beerId}</h1>
    <div>
      <h2>Name: {beerResult.Result!.Name}</h2>
    </div>
    <div>
      <h2>Reviews</h2>
      <div>
        {reviewsHtml}
      </div>
    </div>
  </div>
</body>
</html>
");
        Response.ContentLength = pdf.BinaryData.Length;
        Response.Headers.Add("Content-Disposition", "attachment; filename=results_" + beerId + ".pdf");
        Response.Headers.Add("Content-Type", "application/pdf");

        return File(pdf.BinaryData,MediaTypeNames.Application.Pdf);
    }
}