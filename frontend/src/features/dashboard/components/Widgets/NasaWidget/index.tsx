import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNasaData } from "../../../../../store/nasaSlice";
import { useEffect } from "react";

const NasaWidget: React.FC = () => {
    const nasa_info = useSelector((state: any)=> state.nasa)



    const dispatch = useDispatch();

   
    useEffect(()=> {
      console.log('TIRO O NO???');
      dispatch(fetchNasaData() as any)
    }, [])

   /**
    * add ui like in the weather WIDGET . USE SAME LOGIC AND TRANSITION
    */




  return (
    <>
      <div className="col-span-1 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold ">NASA APOD</h3>
        <img className="rounded-md" src={nasa_info.nasa_apod_data.hdurl} loading="lazy" decoding="async" alt="image" />
        <p className="text-gray-400 mt-2"> Widget representing nasa data</p>
      </div>
    </>
  );
};

export default NasaWidget;
