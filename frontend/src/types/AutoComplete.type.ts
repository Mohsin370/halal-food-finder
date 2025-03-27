export interface AutocompleteResponse {
    suggestions: Suggestion[];
  }
  
  export interface Suggestion {
    placePrediction: {
      placeId: string;
      text: {
        text: string;
      };
    };
  }