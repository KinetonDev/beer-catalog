using Microsoft.AspNetCore.Mvc;

namespace BeerCatalog.WebApi.DTO;

public class PaginationAndFilterDto
{
    [BindProperty(Name="page", SupportsGet=true)]
    public int? Page { get; set; }
    
    [BindProperty(Name="per_page", SupportsGet=true)]
    public int? PerPage { get; set; }
    
    [BindProperty(Name="abv_gt", SupportsGet=true)]
    public double? AbvGreaterThan { get; set; }
    
    [BindProperty(Name="abv_lt", SupportsGet=true)]
    public double? AbvLessThan { get; set; }
    
    [BindProperty(Name="ibu_gt", SupportsGet=true)]
    public double? IbuGreaterThan { get; set; }
    
    [BindProperty(Name="ibu_lt", SupportsGet=true)]
    public double? IbuLessThan { get; set; }
    
    [BindProperty(Name="ebc_gt", SupportsGet=true)]
    public double? EbcGreaterThan { get; set; }
    
    [BindProperty(Name="ebc_lt", SupportsGet=true)]
    public double? EbcLessThan { get; set; }

    [BindProperty(Name="beer_name", SupportsGet=true)]
    public string? BeerName { get; set; }
}