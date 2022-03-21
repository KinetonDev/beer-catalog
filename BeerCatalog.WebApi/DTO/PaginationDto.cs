namespace BeerCatalog.WebApi.DTO;

public class PaginationAndFilterDto
{
    public int Page { get; set; }
    public int PerPage { get; set; }
    public int AbvGreaterThan { get; set; }
    public int AbvLessThan { get; set; }
    public int IbuGreaterThan { get; set; }
    public int IbuLessThan { get; set; }
    public int EbcGreaterThan { get; set; }
    public int EbcLessThan { get; set; }
}