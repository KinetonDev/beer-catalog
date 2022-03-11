using System.ComponentModel.DataAnnotations;

namespace BeerCatalog.WebApi.Common.Models;

public class JwtTokens
{
    [Required]
    public string AccessToken { get; set; }
    
    [Required]
    public string RefreshToken { get; set; }
}