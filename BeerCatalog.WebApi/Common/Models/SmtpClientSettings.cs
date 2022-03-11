namespace BeerCatalog.WebApi.Common.Models;

public class SmtpClientSettings
{
    public string Host { get; set; }
    public int Port { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    
    public const string SmtpSettingsSectionName = "Smtp";
}