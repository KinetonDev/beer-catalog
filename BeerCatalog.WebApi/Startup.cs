using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Application.Services;
using BeerCatalog.Domain.Models;
using BeerCatalog.Infrastructure.Data;
using BeerCatalog.WebApi.BackgroundServices;
using BeerCatalog.WebApi.Common.Models;
using BeerCatalog.WebApi.Helpers;
using BeerCatalog.WebApi.Helpers.Interfaces;
using BeerCatalog.WebApi.Interfaces;
using BeerCatalog.WebApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BeerCatalog.WebApi;

public class Startup
{
    private readonly IWebHostEnvironment _environment;
    private readonly IConfiguration _configuration;

    public Startup(IWebHostEnvironment environment, IConfiguration configuration)
    {
        _environment = environment;
        _configuration = configuration;
    }
    
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, config =>
            {
                var jwtSettings = new JwtSettings();
                _configuration.GetSection(JwtSettings.JwtSettingsSectionName).Bind(jwtSettings);

                config.SaveToken = true;
                config.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = jwtSettings.SigningKey,
                    ClockSkew = TimeSpan.Zero
                };
            });
        
        services.AddDbContext<AppDbContext>(config =>
        {
            if (_environment.IsDevelopment())
                config.UseInMemoryDatabase("BeerCatalog");
            else
                config.UseSqlServer(_configuration.GetConnectionString("BeerCatalog")!);
        });
        
        services.AddIdentity<User, IdentityRole<Guid>>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.AddHostedService<EmailDispatcher>();
        services.AddSingleton<IEmailChannel, EmailChannel>();

        services.Configure<JwtSettings>(_configuration.GetSection(JwtSettings.JwtSettingsSectionName));
        services.Configure<SmtpClientSettings>(_configuration.GetSection(SmtpClientSettings.SmtpSettingsSectionName));

        services.AddTransient<IAuthService, AuthService>();
        services.AddTransient<IUserService, UserService>();
        services.AddTransient<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddTransient<IJwtTokenResolver, JwtTokenResolver>();

        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app)
    {
        if (_environment.IsDevelopment())
            app.UseDeveloperExceptionPage();
        
        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthentication();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapDefaultControllerRoute();
        }); 
    }
}