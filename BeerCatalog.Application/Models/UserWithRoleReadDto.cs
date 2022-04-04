using System.ComponentModel.DataAnnotations;
using BeerCatalog.Application.Common.Attributes;
using Newtonsoft.Json;

namespace BeerCatalog.Application.Models;

public class UserWithRoleReadDto
{
    [Required]
    public Guid Id { get; set; }
    [MaxLength(20)]
    [Required(ErrorMessage = "Username must be set")]
    public string Username { get; set; }
    [JsonConverter(typeof(OnlyDateConverter))]
    public DateTime? BirthDay { get; set; }
    public string? AvatarUrl { get; set; }
    public string? Country { get; set; }
    public string? Gender { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    [MaxLength(20)]
    [Required(ErrorMessage = "Email address must be set")]
    public string Email { get; set; }
    public string Role { get; set; }
}