//  React 
import type { ReactNode } from "react";
//  Redux
import { useDispatch } from "react-redux";
//  Slice
import { setGlobalAlert } from "../store/appSlice";
//  Types
import type { IGlobalAlertStatus } from "../types/store/app";

// Hook responsible of dispatch the global alert 
export const useGlobalAlert = () => {
  const dispatch = useDispatch();

  const handleAlert = (
    status: IGlobalAlertStatus,
    message: string | ReactNode,
    description: string | ReactNode
  ) => {
    dispatch(setGlobalAlert({ status, message, description }));
  };

  return { handleAlert };
};
