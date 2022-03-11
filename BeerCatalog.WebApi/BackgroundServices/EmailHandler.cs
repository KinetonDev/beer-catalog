using System.Threading.Channels;

namespace BeerCatalog.WebApi.BackgroundServices;

public class EmailHandler : BackgroundService
{
    public EmailHandler()
    {
        
    }
    
    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        return Task.CompletedTask;
    }
}