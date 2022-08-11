export interface City {
  name: string;
}

export interface Location {
  country_code: string;
  country_name: string;
  cities: City[];
}
