using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace BeerCatalog.WebApi.Common.Models;

public class JwtSettings
{
    public string Secret { get; set; }
    public SymmetricSecurityKey SigningKey => new (Encoding.UTF8.GetBytes(Secret)); 
    public string Issuer { get; set; }
    public string Audience { get; set; }

    public const string JwtSettingsSectionName = "JwtSettings";
}