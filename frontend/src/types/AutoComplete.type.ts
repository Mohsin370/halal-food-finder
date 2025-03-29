interface AutocompleteResponse {
    suggestions: Suggestion[];
  }
  
  interface Suggestion {
    placePrediction: {
      placeId: string;
      text: {
        text: string;
      };
    };
  }