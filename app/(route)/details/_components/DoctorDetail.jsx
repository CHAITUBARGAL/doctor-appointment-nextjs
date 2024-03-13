import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookAppointment from "./BookAppointment";

const DoctorDetail = ({ doctor }) => {
  const socialMediaList = [
    {
      id: 1,
      icon: "/youtube.jpg",
      url: "/",
    },
    {
      id: 2,
      icon: "/.jpg",
      url: "/facebook.png",
    },
    {
      id: 1,
      icon: "/twitter.png",
      url: "/",
    },
    {
      id: 1,
      icon: "/linkdin.png",
      url: "/",
    },
  ];
  return (
    <>
    <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 border p-5 mt-5 rounded-lg">
      {/* doctor image */}
      <div>
        <Image
          src={doctor.attributes?.image?.data[0].attributes?.url}
          alt="doctor image"
          height={200}
          width={200}
          className="rounded-lg w-full h-[280px] object-cover"
        />
      </div>
      {/* doctor info */}
      <div className="col-span-2 mt-5 flex md:px-10 flex-col gap-3 items-baseline">
        <h2 className="font-bold text-2xl">{doctor.attributes?.name}</h2>
        <h2 className="flex gap-2 text-gray-500 text-md ">
          <GraduationCap />
          <span> {doctor.attributes?.experiences} of Experience</span>
        </h2>
        <h2 className="text-md flex gap-2 text-gray-500">
          <MapPin />
          <span>{doctor.attributes?.address}</span>
        </h2>
        <h2 className="text-primary  bg-gray-100 p-2 rounded-lg">
          {doctor.attributes?.categories}{" "}
        </h2>

        <div className="flex gap-3">
          {socialMediaList.map((item, index) => {
            <Image src={item.icon} key={index} width={30} height={30} />;
          })}
        </div>
        <BookAppointment doctor={doctor}/>
      </div>
      {/* About Doctor */}

    </div>
    <div className="p-3 border rounded-lg ">
        <h2 className="font-bold text-[20px]">About me</h2>
        <p className="text-gray-500 tracking-wide">{doctor.attributes?.description}</p>
      </div>
    </>
  );
};

export default DoctorDetail;

