// import { CircularProgress } from "@mui/material"
import Navbar from '../../components/Nav'
import LeftSidebar from '../../components/SideBar/SideLeft'
import RightSidebar from '../../components/SideBar/SideRight'
import Body from  '../../components/Body'
const HomePage = () => {
  return (
    <div className="bg-gray-950 h-screen w-full">
      <Navbar/>      
      <div className="flex gap-8 p-8">
        <LeftSidebar/>
        <Body/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default HomePage