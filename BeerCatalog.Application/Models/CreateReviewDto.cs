using System.ComponentModel.DataAnnotations;

namespace BeerCatalog.Application.Models;

public class CreateReviewDto
{
    [Required]
    public Guid BeerId { get; set; }
    
    [Required]
    public Guid UserId { get; set; }
    
    [Required]
    public DateTime PostedOn { get; set; }
    
    [Required]
    [StringLength(512, MinimumLength = 0)]
    public string Description { get; set; }
    
    [Required]
    [Range(1, 10)]
    public int Rating { get; set; }
}