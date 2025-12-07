using Microsoft.EntityFrameworkCore;
using MyMvcApi2.Models.Data;
using MyMvcApi2.Helpers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

//Register JwtHelper
var secretKey = builder.Configuration["JwtSettings:SecretKey"];
builder.Services.AddSingleton(new JwtHelper(secretKey));


//Δηήλωση CORS -> ΟΛΑ ΤΑ FRONT ΚΑΝΟΥΝ REQUESTS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll"); //CORS

app.UseAuthorization();

app.MapControllers();

app.Run();
