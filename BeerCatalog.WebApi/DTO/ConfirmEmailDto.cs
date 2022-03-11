namespace BeerCatalog.WebApi.DTO;

public class ConfirmEmailDto
{
    public Guid UserId { get; set; }
    public string Code { get; set; }
}