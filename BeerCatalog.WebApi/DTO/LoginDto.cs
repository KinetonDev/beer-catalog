using System.ComponentModel.DataAnnotations;

namespace BeerCatalog.WebApi.DTO;

public class LoginDto
{
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Provided value is not email")]
    [MaxLength(40, ErrorMessage = "Email is too long. Required: 30 chars max")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Password is required")]
    [MaxLength(50, ErrorMessage = "Login is too long. Required: 50 chars max")]
    [MinLength(8, ErrorMessage = "Login is too short. Required: 8 chars min")]
    public string Password { get; set; }
}