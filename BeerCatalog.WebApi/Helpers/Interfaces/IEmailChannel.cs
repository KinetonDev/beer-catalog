using BeerCatalog.WebApi.Common.Models;

namespace BeerCatalog.WebApi.Helpers.Interfaces;

public interface IEmailChannel
{
    bool IsCompleted();
    Task<EmailMessage> GetEmailMessageAsync();
    Task PushEmailMessageAsync(EmailMessage message);
}