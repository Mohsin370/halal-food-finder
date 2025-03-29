type PlaceDetailsResponse = {
    addressComponents: AddressComponent[];
    location: PlaceLocation;
    rating: number;
    userRatingCount: number;
    displayName: DisplayName;
    shortFormattedAddress: string;
  };
  
  type AddressComponent = {
    longText: string;
    shortText: string;
    types: string[];
    languageCode: string;
  };
  
  type PlaceLocation = {
    latitude: number;
    longitude: number;
  };
  
  type DisplayName = {
    text: string;
    languageCode: string;
  };
  