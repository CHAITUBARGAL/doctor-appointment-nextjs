import Image from "next/image";
import Link from "next/link";

const DoctorList = ({ doctorList, heading="Popular Doctors" }) => {
  return (
    <div className="mb-10 px-8">
      <h1 className="font-bold text-xl">{heading}</h1>
      <div className="grid grid-cols-2 gap-7 mt-4  md:grid-cols-2 lg:grid-cols-4">
      {doctorList.length > 0 ? (
  doctorList.map((doctor, index) => (
    <div
      key={doctor.id} // Use doctor.id as the key
      className="border rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out"
    >
                      <Image
                  src={doctor.attributes?.image?.data[0].attributes?.url}
                  alt="doctor"
                  width={500}
                  height={200}
                  className="h-[200px] w-full objext-cover rounded-lg"
                />
                <div className="mt-3 items-baseline flex flex-col gap-1">
                  <h2 className="text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary">
                    {doctor.attributes?.categories}
                  </h2>
                  <h2 className="font-bold">{doctor.attributes.name}</h2>
                  <h2 className="text-primary text-sm">
                    {doctor.attributes.experiences}
                  </h2>
                  <h2 className="text-gray-500 text-sm">
                    {doctor.attributes.address}
                  </h2>
                  <Link href={'/details/'+doctor?.id} className="w-full">
                  <h1 className="p-2 px-3 border text-primary cursor-pointer rounded-full w-full text-center text-[11px] mt-2 hover:bg-primary hover:text-white ">
                    Book Now
                  </h1>
                  </Link>
                </div>
              </div>


  ))
) : (
  // skeleton effect
  [1, 2, 3, 4, 5, 6].map((item, index) => (
    <div key={index} className="h-[220px] bg-slate-100 w-full rounded-lg animate-pulse"></div>
  ))
)}

      </div>
    </div>
  );
};

export default DoctorList;
