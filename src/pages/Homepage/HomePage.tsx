// import { CircularProgress } from "@mui/material"
import { useEffect , useState } from 'react'
import Navbar from '../../components/Nav'
import LeftSidebar from '../../components/SideBar/SideLeft'
import RightSidebar from '../../components/SideBar/SideRight'
import Body from  '../../components/Body'
import jwtDecode from 'jwt-decode'
const HomePage = () => {
  const [token , setToken ] = useState<string | null>('')
  const [userinfo , setUserInfo] = useState<Object>({})
  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token);
    if(token){
      const decoded : Object = jwtDecode(token)
      setUserInfo(decoded)
    }
    
  }, [])
  return (
    <div className="bg-gray-950 h-auto w-full ">
      <Navbar/>      
      <div className="h-full flex justify-center gap-6 p-6">
        <LeftSidebar/>
        <Body userInfo={userinfo}/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default HomePage