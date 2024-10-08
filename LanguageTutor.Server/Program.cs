using LanguageTutor.Server.Models;
using LanguageTutor.Server.Services;
using Microsoft.AspNetCore.Cors.Infrastructure;

var initBuilder = WebApplication.CreateBuilder(args);
var webRootPath = initBuilder.Configuration.GetValue<string>("webroot");
var builder = WebApplication.CreateBuilder(new WebApplicationOptions {
    Args = args,
    WebRootPath = webRootPath
});

// Add services to the container.
builder.Services.Configure<ServerDatabaseSettings>(
    builder.Configuration.GetSection("ServerDatabase"));

builder.Services.AddSingleton<DbLanguageService>();
builder.Services.AddSingleton<DbResourceService>();
builder.Services.AddSingleton<TranslationService>();

builder.Services.AddControllers();
       // .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        var corsService = ctx.Context.RequestServices.GetRequiredService<ICorsService>();
        var corsPolicyProvider = ctx.Context.RequestServices.GetRequiredService<ICorsPolicyProvider>();
        var policy = corsPolicyProvider.GetPolicyAsync(ctx.Context, "AllowAll").Result;
        var corsResult = corsService.EvaluatePolicy(ctx.Context, policy);
        corsService.ApplyResult(corsResult, ctx.Context.Response);
    }
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/tutor/index.html");

// IConfiguration configuration = app.Configuration.;
// IWebHostEnvironment environment = app.Environment;

app.Run();








