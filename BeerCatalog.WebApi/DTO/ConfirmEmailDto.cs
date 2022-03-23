using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace BeerCatalog.WebApi.DTO;

public class ConfirmEmailDto
{
    [Required(ErrorMessage = "User id is required")]
    public Guid Id { get; set; }
    [Required(ErrorMessage = "Code is required")]
    [StringLength(6, MinimumLength = 6, ErrorMessage = "Code lenght must be 6")]
    public string Code { get; set; }
}