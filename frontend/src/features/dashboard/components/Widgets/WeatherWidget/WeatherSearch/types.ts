import { ITestable } from "../../../../../../types/common/generic";

export interface IWeatherSearchBar extends ITestable {
  setCityName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
  searchByCity: () => void;
  loading: boolean;
  width?: string;
  label?: boolean
}