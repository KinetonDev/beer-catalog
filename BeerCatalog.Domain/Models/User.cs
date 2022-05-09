using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace BeerCatalog.Domain.Models;

public class User : IdentityUser<Guid>
{
    [MaxLength(20)]
    [Required(ErrorMessage = "Username must be set")]
    public override string UserName { get; set; }
    [MaxLength(40)]
    [Required(ErrorMessage = "Email address must be set")]
    public override string Email { get; set; }

    public string? AvatarUrl { get; set; }
    [MaxLength(50, ErrorMessage = "First name should be shorted than 50 characters")]
    [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "First name can only contain letters")]
    public string? FirstName { get; set; }
    [MaxLength(50, ErrorMessage = "Last name should be shorted than 50 characters")]
    [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Last name can only contain letters")]
    public string? LastName { get; set; }
    [StringLength(1, MinimumLength = 1, ErrorMessage = "Gender should consist of 1 letter only")]
    [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Gender can only contain letters")]
    public string? Gender { get; set; }
    [MaxLength(100, ErrorMessage = "Country should be shorter than 100 letters")]
    [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Country can only contain letters")]
    public string? Country { get; set; }
    [DataType(DataType.DateTime, ErrorMessage = "Invalid date")]
    public DateTime? BirthDay { get; set; }
    
    public string? RefreshToken { get; set; }
    public string? EmailConfirmationCode { get; set; }
    public virtual List<Beer.Beer> Favorites { get; set; } = new();

    public virtual ICollection<Beer.Beer> ReviewedBeers { get; set; } = new HashSet<Beer.Beer>();
}