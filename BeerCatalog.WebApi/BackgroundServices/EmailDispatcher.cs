using System.Net;
using System.Net.Mail;
using System.Threading.Channels;
using BeerCatalog.WebApi.Common.Models;
using BeerCatalog.WebApi.Helpers.Interfaces;
using Microsoft.Extensions.Options;

namespace BeerCatalog.WebApi.BackgroundServices;

public class EmailDispatcher : BackgroundService
{
    private readonly IEmailChannel _emailChannel;
    private readonly SmtpClientSettings _smtpClientSettings;
    private readonly ILogger<EmailDispatcher> _logger;
    private readonly SmtpClient _smtpClient;

    public EmailDispatcher(
        IEmailChannel emailChannel,
        IOptions<SmtpClientSettings> smtpClientSettings,
        ILogger<EmailDispatcher> logger)
    {
        _emailChannel = emailChannel;
        _smtpClientSettings = smtpClientSettings.Value;
        _logger = logger;

        var credentials = new NetworkCredential(
            smtpClientSettings.Value.Username, 
            smtpClientSettings.Value.Password);
        
        _smtpClient = new SmtpClient
        {
            Credentials = credentials,
            Host = smtpClientSettings.Value.Host,
            Port = smtpClientSettings.Value.Port,
            EnableSsl = true
        };
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!_emailChannel.IsCompleted())
        {
            var message = await _emailChannel.GetEmailMessageAsync();

            try
            {
                var mailMessage = MapMessage(message);
            
                await _smtpClient.SendMailAsync(mailMessage, stoppingToken);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to send email");
            }
        }
    }

    private MailMessage MapMessage(EmailMessage message)
    {
        var mailMessage = new MailMessage
        {
            IsBodyHtml = true,
            From = new MailAddress(_smtpClientSettings.Username),
            Subject = message.Subject,
            Body = message.Body,
        };
                
        mailMessage.To.Add(new MailAddress(message.To));

        return mailMessage;
    }

    public override void Dispose()
    {
        _smtpClient.Dispose();
        
        base.Dispose();
    }
}