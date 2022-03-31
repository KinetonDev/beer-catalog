namespace BeerCatalog.Infrastructure.Cloud.Firebase.Models;

public class FirebaseSettings
{
    public string ApiKey { get; set; }
    public string Bucket { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public const string FirebaseSettingsSectionName = "Firebase";
}