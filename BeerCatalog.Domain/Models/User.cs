using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace BeerCatalog.Domain.Models;

public class User : IdentityUser<Guid>
{
    [MaxLength(20)]
    [Required(ErrorMessage = "Username must be set")]
    public string Username { get; set; }
    public DateTime? BirthDay { get; set; }
    [MaxLength(20)]
    [Required(ErrorMessage = "Email address must be set")]
    public override string Email { get; set; }
    public string? RefreshToken { get; set; }
    public string? EmailConfirmationCode { get; set; }
    //public List<Beer> Favorites { get; set; } = new();
}