namespace BeerCatalog.Application.Models;

public class BeerFilter
{
    public double? AbvGreaterThan { get; set; }
    
    public double? AbvLessThan { get; set; }
    
    public double? IbuGreaterThan { get; set; }
    
    public double? IbuLessThan { get; set; }
    
    public double? EbcGreaterThan { get; set; }
    
    public double? EbcLessThan { get; set; }

    public string? BeerName { get; set; }
}