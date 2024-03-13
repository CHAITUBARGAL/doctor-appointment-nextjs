"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link";

const Header = () => {
  const Menu = [
    {
      id: "1",
      name: "Home",
      link: "/",
    },
    {
      id: "2",
      name: "Explore",
      link: "/explore",
    },
    {
      id: "3",
      name: "About Us",
      link: "/about",
    },
  ];
  
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log("user")
  }, [user]);

  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo image" width={180} height={80} />
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, index) => (
            <li key={item.id} className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out">
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      {user ? (
        <Popover>
          <PopoverTrigger>
            <Image src={user?.picture} alt="profile picture" width={50} height={50} className="rounded-full" />
          </PopoverTrigger>
          <PopoverContent className='w-44'>
            <ul className="flex flex-col gap-2">
              <li className="cursor-pointer p-2 rounded-md hover:bg-slate-100">Profile</li>
              <Link href={'/mybooking'} className="cursor-pointer p-2 rounded-md hover:bg-slate-100">My Booking</Link>
              <li className="cursor-pointer p-2 rounded-md hover:bg-slate-100" >
                <LogoutLink>Logout</LogoutLink>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      ) : (
        <LoginLink> <Button>Get Started</Button></LoginLink>
      )}
    </div>
  );
};

export default Header;
