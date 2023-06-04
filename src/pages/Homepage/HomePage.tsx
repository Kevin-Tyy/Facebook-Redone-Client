import { CircularProgress } from "@mui/material"

const HomePage = () => {
  return (
    <div className="bg-gray-950 h-screen w-full flex justify-center items-center pb-52">
      <div className="flex flex-col justify-center items-center gap-7">
        <CircularProgress size={30} sx={{ color: "#fff"}}/>
        <p className="text-light">Loading...</p>

      </div>
    </div>
  )
}

export default HomePage