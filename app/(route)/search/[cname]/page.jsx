"use client"
import DoctorList from '@/app/_components/DoctorList'
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'

const page = ({params}) => {

  const [doctorList, setDoctorList] = useState({ })
  useEffect(()=>{
    console.log(params.cname)
  }, [])

  const getDoctors= () => {
    GlobalApi.getDoctorByCategory(params.cname).then(resp=>{
      setDoctorList(resp.data.data); 
    })

  }
  return (
    <div className='mt-5'>
      <h1>
        <DoctorList heading={params.cname}
          doctorList={doctorList}
        />
      </h1>
    </div>
  )
}

export default page
