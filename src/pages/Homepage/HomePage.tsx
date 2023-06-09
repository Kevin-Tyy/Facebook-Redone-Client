// import { CircularProgress } from "@mui/material"
// import { useEffect , useState } from 'react'
import Navbar from '../../components/Nav'
import LeftSidebar from '../../components/SideBar/SideLeft'
import RightSidebar from '../../components/SideBar/SideRight'
import Body from  '../../components/Body'
// import { useSelector } from 'react-redux'
// import { loggeInUser } from '../../redux/features/AuthSlice'
// import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  document.title = 'Facebook | Home'
  return (
    <div className="bg-gray-950 h-auto w-full ">
      <Navbar/>      
      <div className="h-full flex justify-center gap-6 p-6">
        <LeftSidebar/>
        <Body/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default HomePage