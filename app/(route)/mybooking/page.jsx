"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from './_components/BookingList'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'


const page = () => {

  const {user} = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([])

   useEffect(()=>{
    user&&getUserBookinngList()
  }, [user ])
  const getUserBookinngList=()=>{
     GlobalApi.getUserBookinngList(user?.email).then(resp=>{
      console.log(resp.data.data);
      setBookingList(resp.data.data)
     })

  }
  // user to filter user booking
  const filterUserBooking=(type)=>{
    const result = bookingList.filter(item=>
      type=='upcoming'? new Date(item.attributes.Date)>= new Date()
      : new Date(item.attributes.Date)<= new Date()
      )
      console.log(result)
      return result;
  }

  return ( 
    <div className='px-4 sm:px-10 mt-10'>
      <h2 className='font-bold text-2xl'>My booking</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
  <TabsList className='w-full justify-start'>
    <TabsTrigger value="upcoming">Upcoming </TabsTrigger>
    <TabsTrigger value="expired">Expired</TabsTrigger>
  </TabsList>
  <TabsContent value="upcoming">
    <BookingList bookingList={filterUserBooking}/>
  </TabsContent>
  <TabsContent value="expired">
    <BookingList bookingList={filterUserBooking}/>
     </TabsContent>
</Tabs>
 
    </div>
  )
}

export default page
