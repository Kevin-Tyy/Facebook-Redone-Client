import { CircularProgress } from "@mui/material"
import Navbar from '../../components/Nav'
import Sidebar from '../../components/SideBar'
const HomePage = () => {
  return (
    <div className="bg-gray-950 h-screen w-full">
      <Navbar/>      
      <div className="flex gap-2">
        <Sidebar/>
      </div>
    </div>
  )
}

export default HomePage