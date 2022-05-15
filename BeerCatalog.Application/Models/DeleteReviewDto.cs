using System.ComponentModel.DataAnnotations;

namespace BeerCatalog.Application.Models;

public class DeleteReviewDto
{
    [Required]
    public Guid Id { get; set; }
}