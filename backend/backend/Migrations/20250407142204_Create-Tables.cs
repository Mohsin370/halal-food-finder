using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class CreateTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:postgis", ",,");

            migrationBuilder.CreateTable(
                name: "CuisineTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CuisineTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HalalStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HalalStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RestaurantTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RestaurantTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Restaurants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    Suburb = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    State = table.Column<string>(type: "text", nullable: false),
                    PostCode = table.Column<string>(type: "text", nullable: false),
                    Lat = table.Column<string>(type: "text", nullable: false),
                    Lng = table.Column<string>(type: "text", nullable: false),
                    Location = table.Column<Point>(type: "geometry (point, 4326)", nullable: false),
                    PlaceId = table.Column<string>(type: "text", nullable: false),
                    isFeatured = table.Column<bool>(type: "boolean", nullable: false),
                    CuisineTypeId = table.Column<int>(type: "integer", nullable: false),
                    RestaurantTypeId = table.Column<int>(type: "integer", nullable: false),
                    HalalStatusId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restaurants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Restaurants_CuisineTypes_CuisineTypeId",
                        column: x => x.CuisineTypeId,
                        principalTable: "CuisineTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Restaurants_HalalStatuses_HalalStatusId",
                        column: x => x.HalalStatusId,
                        principalTable: "HalalStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Restaurants_RestaurantTypes_RestaurantTypeId",
                        column: x => x.RestaurantTypeId,
                        principalTable: "RestaurantTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "CuisineTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Afghani" },
                    { 2, "Pakistani" },
                    { 3, "Indian" },
                    { 4, "Labanese" },
                    { 5, "Thai" },
                    { 6, "Indonesian" },
                    { 7, "Mexican" },
                    { 8, "Chinese" },
                    { 9, "Korean" },
                    { 10, "Italian" }
                });

            migrationBuilder.InsertData(
                table: "HalalStatuses",
                columns: new[] { "Id", "Description", "Status" },
                values: new object[,]
                {
                    { 1, "This restaurant offer halal food only.", "Certified Halal" },
                    { 2, "This restaurant offer some halal food and some food items are not halal.", "Partially Halal" }
                });

            migrationBuilder.InsertData(
                table: "RestaurantTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Casual Dinning" },
                    { 2, "Fine Dinning" },
                    { 3, "Take Away" },
                    { 4, "Food Truck" },
                    { 5, "Cafe" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_City",
                table: "Restaurants",
                column: "City");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_Country",
                table: "Restaurants",
                column: "Country");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_CuisineTypeId",
                table: "Restaurants",
                column: "CuisineTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_HalalStatusId",
                table: "Restaurants",
                column: "HalalStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_Lat",
                table: "Restaurants",
                column: "Lat");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_Lng",
                table: "Restaurants",
                column: "Lng");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_RestaurantTypeId",
                table: "Restaurants",
                column: "RestaurantTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_State",
                table: "Restaurants",
                column: "State");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Restaurants");

            migrationBuilder.DropTable(
                name: "CuisineTypes");

            migrationBuilder.DropTable(
                name: "HalalStatuses");

            migrationBuilder.DropTable(
                name: "RestaurantTypes");
        }
    }
}
