using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Updatehalalcategorydesc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "HalalStatuses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "HalalStatuses",
                keyColumn: "Id",
                keyValue: 1,
                column: "Description",
                value: "This restaurant offer halal food only.");

            migrationBuilder.UpdateData(
                table: "HalalStatuses",
                keyColumn: "Id",
                keyValue: 2,
                column: "Description",
                value: "This restaurant offer some halal food and some food items are not halal.");

            migrationBuilder.UpdateData(
                table: "HalalStatuses",
                keyColumn: "Id",
                keyValue: 3,
                column: "Description",
                value: "This is a vegeterian restaurant. All food items in the menu are halal.");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "HalalStatuses");
        }
    }
}
