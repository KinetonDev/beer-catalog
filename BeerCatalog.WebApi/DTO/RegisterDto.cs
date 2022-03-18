using System.ComponentModel.DataAnnotations;

namespace BeerCatalog.WebApi.DTO;

public class RegisterDto
{
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Provided value is not email")]
    [MaxLength(30, ErrorMessage = "Email is too long. Required: 30 chars max")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Username is required")]
    [MaxLength(20, ErrorMessage = "Username is too long. Required: 20 chars max")]
    [MinLength(5, ErrorMessage = "Username is too short. Required: 5 chars min")]
    public string Username { get; set; }
    [Required(ErrorMessage = "Password is required")]
    [MaxLength(50, ErrorMessage = "Login is too long. Required: 50 chars max")]
    [MinLength(8, ErrorMessage = "Login is too short. Required: 8 chars min")]
    public string Password { get; set; }
}