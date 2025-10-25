// Redux
import { useDispatch, useSelector } from "react-redux";
// Weather slice.
import {
  fetchWeatherByCity,
  setTemperatureType,
  setSearchText,
} from "../../../../../store/weatherSlice";
import { setGlobalAlert } from "../../../../../store/appSlice";
import { IGlobalAlertStatus } from "../../../../../types/store/app";
import { useEffect } from "react";

export const useWeatherFilterLogic = () => {
  const { searchText, temperatureType , loading} = useSelector(
    (state: any) => state.weather
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherByCity(searchText) as any);
  }, []);

  //  Change temperature type
  const changeTemperature = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTemperatureType(e.currentTarget.value.toLowerCase()));
    dispatch(
      setGlobalAlert({
        status: IGlobalAlertStatus.SUCCESS,
        message: "Success",
        description: `Temperature type changed to ${e.currentTarget.value.toLowerCase()}.`,
      })
    );
  };

  //  Search the weather based on the city
  const searchByCity = () => {
    dispatch(fetchWeatherByCity(searchText) as any) &&
      dispatch(
        setGlobalAlert({
          status: IGlobalAlertStatus.SUCCESS,
          message: "Successo",
          description: `Weather data for ${searchText} recovered with success`,
        })
      );
  };

  const setCityName = (e:  React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.currentTarget.value) as any);
  };

  return {
    changeTemperature,
    searchByCity,
    setCityName,
    temperatureType,
    loading,
    searchText
  };
};
