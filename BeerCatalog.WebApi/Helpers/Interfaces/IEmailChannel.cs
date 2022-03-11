using BeerCatalog.WebApi.Common.Models;

namespace BeerCatalog.WebApi.Helpers.Interfaces;

public interface IEmailChannel
{
    bool IsCompleted();
    Task<EmailMessage> GetEmailMessage();
    Task PushEmailMessage(EmailMessage message);
}