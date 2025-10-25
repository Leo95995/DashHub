export interface IWeatherSearchBar {
  setCityName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
  searchByCity: () => void;
  loading: boolean;
  width?: string;
  label?: boolean
}