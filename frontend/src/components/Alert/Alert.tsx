import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";

// Success
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import React, { useEffect, useState, type ReactNode } from "react";
import { IGlobalAlertStatus } from "../../types/store/app";
import type { Placement } from "./types";

const Alert: React.FC = () => {

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const alert = useSelector((state: any) => state.app.globalAlert);

  useEffect(()=> {
    setIsVisible(true)

    setTimeout(() => {
      setIsVisible(false)
    }, 3000);
  }, [alert])


  const getPositionByAlertPlacement = (
    placement: Placement,
    position?: number
  ) => {
    let classToRet = "";
    
    // Dinamically rendering with tailwind classes for the alert position on the global page.
    switch (placement) {
      case "top":
        classToRet = `top-${position}`;
        break;
      case "bottom":
        classToRet = `bottom-${position}`;
        break;
      case "left":
        classToRet = `left-${position}`;
        break;
      case "right":
        classToRet = `right-${position}`;
        break;
      case "top-right":
        classToRet = `top-${position} right-${position}`;
        break;
      case "top-left":
        classToRet = `top-${position} left-${position}`;
        break;
      case "bottom-left":
        classToRet = `bottom-${position} left-${position}`;
        break;
      case "bottom-right":
        classToRet = `bottom-${position} right-${position}`;
        break;
      default:
        classToRet = "";
    }
    return classToRet;
  };

  const AlertBody = (
    color: string = "bg-green-600",
    message: string,
    description: string,
    icon: ReactNode | any
  ) => {


    return (
      <>
       {isVisible && <div
          className={`${color}  text-white top-0  w-full z-[99999999] flex items-start p-4 px-10  flex-col fixed ${getPositionByAlertPlacement(
            'top',
            20
          )} `}
        >
          <div className="w-full flex justify-between">
            <span className="text-md font-bold"><span className="pr-2">{icon}</span>{message}</span>
            <div className="cursor-pointer" onClick={()=> setIsVisible(false)}>
              <Close style={{fontSize:'20px'}}/>
            </div>
          </div>
          <span className="text-sm">{description}</span>{" "}
        </div>}
      </>
    );
  };

  const renderAlertByStatus = () => {
    const alertData = alert.status;
    switch (alertData) {
      case IGlobalAlertStatus.NO_STATUS:
        return <></>;
      case IGlobalAlertStatus.ERROR:
        return AlertBody("bg-red-600", alert?.message, alert.description, <ErrorIcon style={{fontSize:'20px'}} className="text-white"/>);
      case IGlobalAlertStatus.SUCCESS:
        return AlertBody("bg-green-600", alert?.message, alert.description, <CheckCircleIcon style={{fontSize:'20px'}} className="text-white"/>)
      case IGlobalAlertStatus.WARN:
        return AlertBody("bg-yellow-600", alert?.message, alert.description, <InfoIcon style={{fontSize:'20px'}} className="text-white"/>);
    }
  };

  return <>{renderAlertByStatus()}</>;
};

export default Alert;
