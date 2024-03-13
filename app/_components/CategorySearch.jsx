"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import GlobalApi from "../_utils/GlobalApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CategorySearch = () => {

  const [categoryList, setCategoryList] = useState([])

  useEffect(()=>{
    getCategoryList();
  }, [])
  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp=>{
      console.log(resp.data.data);
      setCategoryList(resp.data.data);
    })
  }

  return (
    <div className="mb-10 items-center px-5 flex flex-col gap-2">
      <h2 className="font-bold text-4xl tracking-wide">
        Search <span className="text-primary">Doctors </span>{" "}
      </h2>
      <h2 className="text-gray-500 text-xl">
        Search your Doctors and Book Appointment in one Click{" "}
      </h2>
      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Search" />
        <Button type="submit">
        <Search className="h-4 w-4 mr-2"/>
        Search</Button>
      </div>
      {/* Display list of catory */}
      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6">
      {categoryList.length > 0 ? categoryList.map((item) => (
  <Link href={'/search/' + item.attributes.name} key={item.id} className="flex flex-col text-center items-center p-5 bg-blue-50 m-2 rounded-lg gap-2 hover:scale-110 transition-all ease-in-out cursor-pointer">
    <Image
      src={item.attributes.image.data[0].attributes.url}
      alt="icon"
      width={40}
      height={40}
    />
    <label className="text-blue-600 text-sm">{item.attributes?.name}</label>
  </Link>
)) :
// skeleton effect
[1, 2, 3, 4, 5, 6].map((item, index) => (
  <div key={index} className="h-[100px] bg-slate-100 m-2 w-full rounded-lg animate-pulse"></div>
))}


      </div>
    </div>
  );
};
export default CategorySearch;
 