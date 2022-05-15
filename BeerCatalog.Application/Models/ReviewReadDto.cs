using System.Text.Json.Serialization;
using BeerCatalog.Application.Common.Attributes;

namespace BeerCatalog.Application.Models;

public class ReviewReadDto
{
    [JsonConverter(typeof(OnlyDateConverter))]
    public DateTime PostedOn { get; set; }
    
    public string Description { get; set; }
    
    public int Rating { get; set; }
    
    public string Username { get; set; }
    

    public Guid UserId { get; set; }

    public Guid Id { get; set; }
    
    public string AvatarUrl { get; set; }
}