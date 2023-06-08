import Navbar from "../../components/Nav";
import bgImage from "../../assets/noman.jpg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseURL } from "../../utils/Link";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";

interface User {
	username : string;
}
interface Posts {

}
const profile = () => {
	const { id } = useParams();
	const { user } = useSelector(loggedInUser)
	console.log(user)
	const [userData , setUserData] = useState<User | null>(null);
	const [posts , setPosts ] = useState<Posts | null>(null)
	const fetchProfile = async (url : string) => {
		try {
			const { data } = await axios.get(url);
			setUserData(data);
			// console.log(data);
			
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong , Try again later.");
		}
	}
	const fetchUserPosts = async (url : string) => {
		try {
			const { data } = await axios.get(url);
			setPosts(data);
			// console.log(data);
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong , Try again later.");
		}
	}
	useEffect(()=> {
		fetchProfile(`${BaseURL}/user/${id}`)
		fetchUserPosts(`${BaseURL}/post/${id}`)
	}, [])
	// {userData ? 
	// 	:
	// 	document.title = "Loading..."
	// }
	if(userData ){
		if(userData.userId == userId){
			document.title = "Your profile"
		}
		document.title = `Profile - ${userData?.username}`

	}else{

	}
	return (
		<div className="h-screen w-full bg-gray-950 ">
			<Navbar />

			<div>
				<div
					className="relative bg-no-repeat bg-cover bg-center bg-[url('../src/assets/noman.jpg')] flex flex-col items-center h-[35vh] p-20 justify-center	">
						<div className="flex flex-col absolute top-72 justify-center">
							<div className="bg-gradient-to-r from-violet-800 to-sky-500 rounded-full p-[5px]">
								<div className="bg-black rounded-full p-[5px]">
									<img src={bgImage} className="w-44 h-44 rounded-full"/>

								</div>

							</div>

							<p>John Smith</p>

						</div>
				</div>
				<div className="flex justify-center">
					<div className="bg-primary-200 h-[200px] w-full md:w-[85%] rounded-b-3xl">
						hello
					</div>

				</div>
			</div>
			<Toaster/>
		</div>
	);
};

export default profile;
