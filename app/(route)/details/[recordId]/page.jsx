"use client"
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";
import DoctorDetail from "../_components/DoctorDetail";
import DoctorSuggestionList from "../_components/DoctorSuggestionList";

const page = ({ params }) => {
  const [doctor, setDoctor] = useState([]);
  useEffect(() => { 
    getDoctorById(); 
  });
  const getDoctorById = () => {
    GlobalApi.getDoctorById(params.recordId).then((resp) => {
      // console.log(resp); 
      setDoctor(resp.data.data);
    });
  };
  return (
    <div className="p-5 md:px-20">
      <h1 className="font-bold text-[22px] "> details</h1>
      <div className="grid grid-cols-1 ld:grid-cols-4">
        {/* doctor details */}
        <div className="col-span-3">
         {doctor&&<DoctorDetail doctor={doctor} />} 
        </div>

        {/* docotor suggestion */}
        <DoctorSuggestionList/>
        <div></div>
      </div>
    </div>
  );
};

export default page;
