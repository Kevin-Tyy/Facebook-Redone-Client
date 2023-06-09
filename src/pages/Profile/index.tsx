import Navbar from "../../components/Nav";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseURL } from "../../utils/Link";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { Add, CameraAltRounded, Edit } from "@mui/icons-material";
import { Tabs } from "../../utils/utilObjects";
import PostComponent from "../../components/Posts/Post";
import ButtonComp from "../../components/Buttons/Button";
import Box from "../../components/Posts/PostComponents/PostBoxComponent";
import { Userdata } from "../../types/Types";
interface User {
	username: string;
	email: string;
	profileimage: string;
	friendlist: Array<object>;
}

interface Posts {}
const profile = () => {
	const { id } = useParams();
	const [userData, setUserData] = useState<Userdata | null>(null);
	const [posts, setPosts] = useState<Posts | null>(null);
	const [activeTab, setActiveTab] = useState("posts");
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser);
	const fetchProfile = async (url: string) => {
		try {
			const { data } = await axios.get(url);
			setUserData(data);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong , Try again later.");
		}
	};
	const fetchUserPosts = async (url: string) => {
		try {
			const {
				data: { data },
			} = await axios.get(url);
			setPosts(data);
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong , Try again later.");
		}
	};
	useEffect(() => {
		fetchProfile(`${BaseURL}/user/${id}`);
		fetchUserPosts(`${BaseURL}/post/${id}`);
	}, []);
	if (userData) {
		if (userData?.userId == userId) {
			document.title = "Your profile";
		} else {
			document.title = `Profile - ${userData?.username}`;
		}
	} else {
		document.title = "Facebook";
	}
	console.log(posts);
	return (
		<div className="h-full w-full bg-gray-950 ">
			<Navbar />
			<div className="h-[45vh]  w-full absolute bg-gray-800/30 "></div>
			<div className="flex w-full justify-center ">
				<div className="w-full  xl:w-[60%] flex flex-col gap-4">
					<div>
						<div className="relative bg-no-repeat bg-cover bg-center bg-[url('../src/assets/noman.jpg')] flex flex-col items-center h-[35vh] p-20 justify-center z-[2]">
							<div className="flex flex-col items-center absolute -bottom-44 justify-center">
								<div className="bg-gradient-to-r from-violet-800 to-sky-500 rounded-full p-[5px]">
									<div className="bg-black rounded-full p-[5px]">
										<img
											src={userData?.profileimage}
											className="w-44 h-44 rounded-full object-cover"
										/>
									</div>
									<CameraAltRounded
										sx={{ fontSize: 50 }}
										className="absolute right-0 top-36 bg-gray-900 p-2 text-light border border-gray-700 rounded-full cursor-pointer bottom-12 active:scale-95 hover:scale-105"
									/>
								</div>
								<div className="flex flex-col  justify-center items-center gap-1">
									<p className="capitalize text-4xl text-light">
										{userData?.username}
									</p>
									<p className="text-light">
										{userData?.firstname} {userData?.lastname}
									</p>
									<p className="text-light/30">{userData?.email}</p>
									<div className="text-light/30 font-black flex gap-7">
										<p>{userData && userData?.friendList.length} Friends</p>
										<p>{posts && posts.length} Posts</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-center">
							<div className="bg-primary-200 h-[220px] md:h-[200px] w-full relative z-[1] rounded-b-lg">
								<div className="absolute right-[25%] md:right-4 bottom-4 flex justify-center gap-2">
									<ButtonComp color={"#0C88EF"}>
										<Add />
										Add to story
									</ButtonComp>
									<ButtonComp color={"#010A13"}>
										<Edit />
										Edit profile
									</ButtonComp>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-primary-200 flex gap-2 p-2 justify-center rounded-md sticky top-[75px] z-10 shadow-2xl">
						{Tabs.map((tab, index) => (
							<div
								key={index}
								onClick={() => setActiveTab(tab)}
								className={`px-6 py-3 rounded-md transition duration-300 capitalize cursor-pointer hover:bg-gray-700/50 text-white ${
									activeTab == tab && "bg-gray-700"
								}`}>
								{tab}
							</div>
						))}
					</div>
					<div className="flex gap-4">
						<div className="bg-primary-200 h-[500px] w-full p-5 sticky top-36 rounded-lg">
							<div>
								<h1 className="text-2xl text-light">About</h1>
								
							</div>
						</div>
						<div className="w-full flex flex-col gap-4">
							<PostComponent />
							<h1 className="text-light text-3xl text-center">
								{userData?.userId == userId
									? "Your"
									: `${userData?.username}'s`}{" "}
								Posts
							</h1>
							{posts && (
								<div className="flex flex-col gap-6 ">
									{posts.map((post: object, index: number) => (
										<div key={index}>
											<Box {...post} />
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</div>
	);
};

export default profile;
