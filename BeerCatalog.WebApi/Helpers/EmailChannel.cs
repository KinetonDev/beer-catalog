using System.Threading.Channels;
using BeerCatalog.WebApi.Common.Models;
using BeerCatalog.WebApi.Helpers.Interfaces;

namespace BeerCatalog.WebApi.Helpers;

public class EmailChannel : IEmailChannel
{
    private readonly Channel<EmailMessage> _channel;
    public EmailChannel()
    {
        _channel = Channel.CreateUnbounded<EmailMessage>();
    }

    public bool IsCompleted() => _channel.Reader.Completion.IsCompleted;

    public async Task<EmailMessage> GetEmailMessageAsync()
    {
        return await _channel.Reader.ReadAsync();
    }

    public async Task PushEmailMessageAsync(EmailMessage message)
    {
        await _channel.Writer.WriteAsync(message);
    }
}