import React from "react";
import Logo from "../Logo";
import { Telegram, MoreVert, Notifications, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";

type Props = {};


const navObj = [
  {icon : <MoreVert sx={{ fontSize :30}}/>},
  {icon : <Telegram sx={{ fontSize :30}} />},
  {icon : <Notifications sx={{ fontSize :30}}/>},
]
const Navbar = (props: Props) => {
	return (
    <div className="sticky top-0 z-[2]">
      <div className="flex justify-between bg-primary-200 p-4 ">
        <Logo />
        <div className="bg-gray-950 flex items-center gap-3 p-1 rounded-full w-[500px] pl-4">
          <Search sx={{ color : '#fff' }}/>
          <input type="text" className="w-full bg-transparent outline-none text-white" placeholder="Search facebook"/>
        </div>
        <div className="flex gap-4 ">
          {navObj.map((nav ,index)=> (
            <div key={index} className="bg-gray-950 p-1.5 flex items-center justify-center rounded-full text-primary-100 cursor-pointer hover:bg-primary-300 transition duration-150">
              {nav.icon}
            </div>
          ))}
          <Avatar className="cursor-pointer">J</Avatar>
          
        </div>
      </div>
    </div>
	);
};

export default Navbar;
