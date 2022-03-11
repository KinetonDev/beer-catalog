using System.Threading.Channels;
using BeerCatalog.WebApi.Helpers.Interfaces;

namespace BeerCatalog.WebApi.BackgroundServices;

public class EmailDispatcher : BackgroundService
{
    private readonly IEmailChannel _emailChannel;

    public EmailDispatcher(IEmailChannel emailChannel)
    {
        _emailChannel = emailChannel;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!_emailChannel.IsCompleted())
        {
            var message = await _emailChannel.GetEmailMessage();
            
            //do something with email
        }
    }
}