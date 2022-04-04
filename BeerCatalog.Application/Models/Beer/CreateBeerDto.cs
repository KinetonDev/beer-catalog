using System.ComponentModel.DataAnnotations;

namespace BeerCatalog.Application.Models.Beer;

public class CreateBeerDto
{
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; } = null!;
    
    [Required(ErrorMessage = "Tagline is required")]
    public string Tagline { get; set; } = null!;
    
    [Required(ErrorMessage = "Description is required")]
    public string Description { get; set; } = null!;
    
    [Required(ErrorMessage = "ImageUrl is required")]
    public string ImageUrl { get; set; } = null!;
    
    [Required(ErrorMessage = "Abv is required")]
    public double Abv { get; set; }
    
    [Required(ErrorMessage = "Ibu is required")]
    public double Ibu { get; set; }
    
    [Required(ErrorMessage = "Ebc is required")]
    public double Ebc { get; set; }
    
    [Required(ErrorMessage = "Method is required")]
    public Method Method { get; set; }
    
    [Required(ErrorMessage = "Ingredients is required")]
    public Ingredients Ingredients { get; set; }
    
    public virtual ICollection<string> FoodPairing { get; set; } = new List<string>();
    
    [Required(ErrorMessage = "Brewers tips is required")]
    public string BrewersTips { get; set; } = null!;
}