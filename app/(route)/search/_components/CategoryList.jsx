"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const CategoryList = () => {
  
    const [categoryList, setCategoryList] = useState([])
    const params = usePathname() 
    const category = params.split('/')[2];

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
    <div className='h-screen mt-5 flex flex-col'>
      <Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList className='overflow-visible'>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
    {categoryList&&categoryList.map((item, index) =>(
      <CommandItem key={index}> 
        <Link 
          href={'/search/'+item?.attributes?.name}
          className={`p-2 flex gap-2 text-[14px] text-blue-600 items-center rounded-md cursor-pointer w-full ${category==item.attributes.name&&'bg-blue-100'}`}>
          <Image
            src={item.attributes.image.data[0].attributes.url}
            alt="icon"
            width={25}
            height={25}
          />
          <label>{item.attributes.name}</label>
          </Link>
      </CommandItem>
    ))}
    </CommandGroup>

  </CommandList>
</Command>

    </div>
  )
}

export default CategoryList






// "use client"

// import React, { useEffect, useState } from 'react'
// import {
//     Command,
//     CommandDialog,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList,
//     CommandSeparator,
//     CommandShortcut,
//   } from "@/components/ui/command"
// import GlobalApi from '@/app/_utils/GlobalApi'
// import Link from 'next/link'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation'
  
// const CategoryList = () => {



//     const [categoryList, setCategoryList] = useState([])
//     const params = usePathname()
//     const category = params.split('/')[2]

//     useEffect(()=>{
//       getCategoryList();
//       console.log(params);
//     }, [])
//     const getCategoryList = () => {
//       GlobalApi.getCategory().then(resp=>{
//         console.log(resp.data.data);
//         setCategoryList(resp.data.data);
//       })
//     }
//   return (
//     <div className='h-screen fixed mt-5 flex flex-col'>
// <Command>
//   <CommandInput placeholder="Type a command or search..." />
//   <CommandList className="overflow-hidden">
//     <CommandEmpty>No results found.</CommandEmpty>
//     <CommandGroup heading="Suggestions">
//     {categoryList&&categoryList.map((item,index)=>(
//         <CommandItem>
//             <Link href={'/search/'+item.attributes?.name}  key={index}
//             className={`p-2 flex gap-2 text-[14px] text-blue-600 rounded-md items-center cursor-pointer w-full ${category==item.attributes.name&&"bg-blue-50"}`}>
//             <Image
//                   src={item.attributes.image.data[0].attributes.url}
//           alt="icon"
//           width={40}
//           height={40}
//             />
//                 <label>{item.attributes.name}</label>
//             </Link>
//         </CommandItem>
//     ))}


//     </CommandGroup>

//   </CommandList>
// </Command>

//     </div>
//   )
// }

// export default CategoryList
