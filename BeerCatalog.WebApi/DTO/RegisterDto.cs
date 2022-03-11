using System.ComponentModel.DataAnnotations;

namespace BeerCatalog.WebApi.DTO;

public class RegisterDto
{
    [EmailAddress]
    [Required]
    [MaxLength(30)]
    public string Email { get; set; }
    [Required]
    [MaxLength(20)]
    [MinLength(5)]
    public string Username { get; set; }
    [Required]
    [MaxLength(50)]
    [MinLength(8)]
    public string Password { get; set; }
}