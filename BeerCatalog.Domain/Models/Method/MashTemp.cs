namespace BeerCatalog.Domain.Models.Method
{
    public class MashTemp
    {
        public Guid Id { get; set; }
        public int Value { get; set; }
        public int Duration { get; set; }
        public Guid BeerId { get; set; }

        public virtual Beer.Beer Beer { get; set; } = null!;
    }
}
