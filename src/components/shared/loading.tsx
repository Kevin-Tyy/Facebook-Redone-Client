import { CircularProgress } from "@mui/material"

const loading = () => {
  return (
    <div className="h-screen z-50 relative w-full">
      <div className="inset-0 fixed bg-background-primary/70 backdrop-blur-lg flex items-center justify-center">
        <CircularProgress size={30}/>
      </div>
    </div>
  )
}

export default loading