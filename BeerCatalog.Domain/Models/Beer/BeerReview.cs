using System.ComponentModel.DataAnnotations.Schema;

namespace BeerCatalog.Domain.Models.Beer;

public class BeerReview
{
    public Guid Id { get; set; }
    
    [Column("BeerId")]
    public Guid BeerId { get; set; }
    
    [Column("UserId")]
    public Guid UserId { get; set; }

    public DateTime PostedOn { get; set; }
    
    public string Description { get; set; }

    public int Rating { get; set; }
    
    [ForeignKey("BeerId")]
    public virtual Beer Beer { get; set; } = null!;

    [ForeignKey("UserId")]
    public virtual User User { get; set; } = null!;
}