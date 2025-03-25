namespace backend.DTOs
{
    public class GoogleAutocompleteResponseDto
    {
        public List<Prediction> Predictions { get; set; }
        public string Status { get; set; }
    }

    public class Prediction
    {
        public string Description { get; set; }
        public string PlaceId { get; set; }
        public StructuredFormatting StructuredFormatting { get; set; }
    }

    public class StructuredFormatting
    {
        public string MainText { get; set; }
        public string SecondaryText { get; set; }
    }
}
