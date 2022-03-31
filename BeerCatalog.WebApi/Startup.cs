using BeerCatalog.Application.Interfaces.Cloud;
using BeerCatalog.Application.Interfaces.Repositories;
using BeerCatalog.Application.Interfaces.Services;
using BeerCatalog.Application.Services;
using BeerCatalog.Domain.Models;
using BeerCatalog.Infrastructure;
using BeerCatalog.Infrastructure.Cloud.Firebase;
using BeerCatalog.Infrastructure.Cloud.Firebase.Models;
using BeerCatalog.Infrastructure.Data;
using BeerCatalog.WebApi.BackgroundServices;
using BeerCatalog.WebApi.Common.Models;
using BeerCatalog.WebApi.Helpers;
using BeerCatalog.WebApi.Helpers.Interfaces;
using BeerCatalog.WebApi.IdentityTokenProviders;
using BeerCatalog.WebApi.Interfaces;
using BeerCatalog.WebApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace BeerCatalog.WebApi;

public class Startup
{
    private readonly IWebHostEnvironment _environment;
    private readonly IConfiguration _configuration;

    public Startup(IWebHostEnvironment environment, IConfiguration configuration)
    {
        _environment = environment;

        _configuration = new ConfigurationBuilder()
            .AddJsonFile(Path.Combine(Directory.GetCurrentDirectory(), "firebaseSettings.json"))
            .AddConfiguration(configuration)
            .Build();
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
            config.UseSqlServer(_configuration.GetConnectionString("BeerCatalog")!);
        });

        services.AddScoped<DbContext>(_ => _.GetRequiredService<AppDbContext>());
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IRemoteStorage, FirebaseRemoteStorage>();
        
        services.AddIdentity<User, IdentityRole<Guid>>(options =>
            {
                options.Password.RequiredLength = 8;

                options.Tokens.EmailConfirmationTokenProvider = nameof(EmailSixDigitConfirmationTokenProvider);
            })
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders()
            .AddTokenProvider<EmailSixDigitConfirmationTokenProvider>(nameof(EmailSixDigitConfirmationTokenProvider));

        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.AddHostedService<EmailDispatcher>();
        services.AddSingleton<IEmailChannel, EmailChannel>();

        services.Configure<JwtSettings>(_configuration.GetSection(JwtSettings.JwtSettingsSectionName));
        services.Configure<SmtpClientSettings>(_configuration.GetSection(SmtpClientSettings.SmtpSettingsSectionName));
        services.Configure<FirebaseSettings>(_configuration.GetSection(FirebaseSettings.FirebaseSettingsSectionName));

        services.AddTransient<IAuthService, AuthService>();
        services.AddTransient<IUserService, UserService>(); 
        services.AddTransient<IBeerService, BeerService>();
        services.AddTransient<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddTransient<IJwtTokenResolver, JwtTokenResolver>();
        services.AddHttpClient();

        services.AddControllers().AddNewtonsoftJson(options =>
        {
            options.SerializerSettings.ContractResolver = new DefaultContractResolver
            {
                NamingStrategy = new SnakeCaseNamingStrategy()
            };
            options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        });

        services.AddCors(options =>
        {
            options.AddPolicy("SPA", builder =>
            {
                builder.AllowAnyMethod()
                    .AllowCredentials()
                    .AllowAnyHeader()
                    .WithExposedHeaders("x-total-count")
                    .WithOrigins("http://localhost:3000");
            });

            options.DefaultPolicyName = "SPA";
        });
    }

    public void Configure(IApplicationBuilder app)
    {
        if (_environment.IsDevelopment())
            app.UseDeveloperExceptionPage();
        
        app.UseHttpsRedirection();

        app.UseRouting();
        
        app.UseCors();

        app.UseAuthentication();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapDefaultControllerRoute();
        }); 
    }
}