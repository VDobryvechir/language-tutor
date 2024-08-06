using LanguageTutor.Server.Models;
using LanguageTutor.Server.Services;

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

builder.Services.AddControllers();
       // .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();








