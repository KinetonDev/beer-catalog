using System.ComponentModel.DataAnnotations;

namespace BeerCatalog.WebApi.DTO;

public class LoginDto
{
    [Required]
    [EmailAddress]
    [MaxLength(30)]
    public string Email { get; set; }
    [Required]
    [MaxLength(50)]
    [MinLength(8)]
    public string Password { get; set; }
}