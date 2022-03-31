using System.ComponentModel.DataAnnotations;

namespace BeerCatalog.Application.Models;

public class ChangeAvatarDto
{
    [Required]
    public string AvatarBase64 { get; set; }
}