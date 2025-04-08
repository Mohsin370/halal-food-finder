namespace backend.Mappers
{
    using NetTopologySuite;
    using NetTopologySuite.Geometries;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    public class PointConverter : JsonConverter<Point>
    {
        public override void WriteJson(JsonWriter writer, Point? value, JsonSerializer serializer)
        {
            if (value == null)
            {
                writer.WriteNull();
                return;
            }

            var obj = new JObject
            {
                ["lat"] = value.Y,
                ["lng"] = value.X
            };
            obj.WriteTo(writer);
        }

        public override Point? ReadJson(JsonReader reader, Type objectType, Point? existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            var obj = JObject.Load(reader);
            var lat = (double)obj["lat"];
            var lng = (double)obj["lng"];
            var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
            return geometryFactory.CreatePoint(new Coordinate(lng, lat));
        }
    }
}