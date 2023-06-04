import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="bg-gray-950 h-screen w-full flex justify-center items-center pb-52">
        <div className="flex flex-col justify-center items-center">

            <h1 className="text-white text-2xl">
                Oops ! The page you are looking for is not available    
            </h1>
            <h2 className="text-gray-600 text-lg">Return to the{" "}
                <Link to="home" className="hover:underline">Homepage</Link>
            </h2>
        </div>
    </div>
  )
}

export default NotFound