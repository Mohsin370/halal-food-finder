using backend.Data;
using backend.Helpers;
using backend.Services;
using dotenv.net;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);


//Load env
DotEnv.Load(new DotEnvOptions(probeForEnv: true)); // Load .env


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ServerContext>();
builder.Services.AddScoped<RestaurantService>();
builder.Services.AddSingleton<CloudinaryFTP>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", PolicyBuilder =>
        PolicyBuilder.AllowAnyOrigin()
                     .AllowAnyMethod()
                     .AllowAnyHeader());

});

var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ServerContext>();
    dbContext.Database.Migrate();  
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseSwagger();
app.UseSwaggerUI();
//app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowAllOrigins");

app.MapControllers();

app.Run();
