type PlaceDetailsResponse = {
  addressComponents: AddressComponent[];
  location: PlaceLocation;
  rating: number;
  userRatingCount: number;
  displayName: DisplayName;
  shortFormattedAddress: string;
  id: string;
  reviews: GoogleReview[]
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

type GoogleReview = {
  authorAttribution: {
    displayName: string;
  };
  publishTime: Date;
  rating: number;
  text: {
    text: string;
  };
};