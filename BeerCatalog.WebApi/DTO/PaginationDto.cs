using Microsoft.AspNetCore.Mvc;

namespace BeerCatalog.WebApi.DTO;

public class PaginationDto
{
    [BindProperty(Name="page", SupportsGet=true)]
    public int? Page { get; set; }
    
    [BindProperty(Name="per_page", SupportsGet=true)]
    public int? PerPage { get; set; }
}