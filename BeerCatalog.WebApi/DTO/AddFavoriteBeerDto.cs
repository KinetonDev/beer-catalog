using System.ComponentModel.DataAnnotations;

namespace BeerCatalog.WebApi.DTO;

public class AddFavoriteBeerDto
{
    [Required(ErrorMessage = "BeerId is required")]
    public Guid BeerId { get; set; }
}