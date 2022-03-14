using System.ComponentModel.DataAnnotations;

namespace BeerCatalog.Application.Models;

public class UserReadDto
{
    [Required]
    public Guid Id { get; set; }
    [MaxLength(20)]
    [Required(ErrorMessage = "Username must be set")]
    public string Username { get; set; }
    public DateTime? BirthDay { get; set; }
    [MaxLength(20)]
    [Required(ErrorMessage = "Email address must be set")]
    public string Email { get; set; }
}