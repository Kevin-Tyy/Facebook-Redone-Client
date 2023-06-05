import { FlagRounded, GroupRounded, HomeRounded, PeopleRounded, Shop2Rounded, SportsEsportsRounded, WatchRounded } from '@mui/icons-material'
// import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import { Avatar } from '@mui/material'
import React from 'react'

type Props = {}

const UtilObj = [
  {icon : <HomeRounded sx={{ fontSize : 25}}/> , title : "Home"},
  {icon : <PeopleRounded sx={{ fontSize : 25}}/> , title : "Friends"},
  {icon : <GroupRounded sx={{ fontSize : 25}}/> , title : "Groups"},
  {icon : <WatchRounded sx={{ fontSize : 25}}/> , title : "Watch"},
  {icon : <FlagRounded sx={{fontSize : 25}}/>, title : "Pages"},
  {icon : <Shop2Rounded sx={{ fontSize : 25}}/> , title : "Market"},
  {icon :  <SportsEsportsRounded sx={{ fontSize : 25}}/>, title : "Gaming"},
]

const Sidebar = (props: Props) => {
  return (
    <div className='bg-primary-200 m-4 p-4 w-[250px] flex flex-col'>
      <div className='flex items-center gap-3 border-b border-primary-100 p-5'>
        <Avatar>J</Avatar>
        <p className='text-white'>John Doe</p>
      </div>
      <div >
        {UtilObj.map((obj , index)=> (
          <div className='flex items-center gap-4 p-2'>
            <span className='text-white'>{obj.icon}</span>
            <p className='text-white'>{obj.title}</p>
          </div>
        ))}
      </div>
      <button className='bg-gray-950 text-white'>
        See more
      </button>
    </div>
  )
}

export default Sidebar