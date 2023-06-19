import { CircularProgress } from "@mui/material"


const Spinner = () => {
  return (
    <div className="flex justify-center py-10">
        <CircularProgress size={20} sx={{ color : '#fff'}}/>
    </div>
  )
}

export default Spinner