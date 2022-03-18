using System.ComponentModel.DataAnnotations;

namespace BeerCatalog.WebApi.DTO;

public class RefreshTokensDto
{
    [Required(ErrorMessage = "Refresh token is required")]
    public string RefreshToken { get; set; }
}