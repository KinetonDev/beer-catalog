namespace BeerCatalog.Application.Models.Beer;

public class Method
{
    public IEnumerable<MashTempReadDto> MashTemp { get; set; } = new List<MashTempReadDto>();
    public FermentationReadDto Fermentation { get; set; }
    public string? Twist { get; set; }
}