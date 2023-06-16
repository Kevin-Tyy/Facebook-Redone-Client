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
import { UserInfo, Userdata } from "../../types/Types";
import ProfileDetail from "../../components/Detail/profileDetail";
import ImageUpdate from "../../components/Detail/imageUpdate";
import StoryModal from "../../components/Modals/StoryModal";
import placeholderImage from "../../assets/avatar.webp";
import DetailModal from "../../components/Detail/UpdateModal";
import ProfileImage from "../../components/Posts/Preview/ProfileImage";

interface Posts {}
const profile = () => {
	const { id } = useParams();
	const [isToggled, setIsToggled] = useState(false);
	const handleStoryToggle = () => {
		setIsToggled(!isToggled);
	};
	const [userData, setUserData] = useState<Userdata | null>(null);
	const [posts, setPosts] = useState<Posts | null>(null);
	const [activeTab, setActiveTab] = useState("posts");
	const [isOpen, setIsOpen] = useState(false);
	const [imageUpdate , setImageUpdate ] = useState(false)
	const [viewImage , setViewImage] = useState(false)
	const [previewimage , setPreviewImage] = useState<string | null>(null)
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
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
				<div className="w-full px-3 md:px-16 2xl:px-0 2xl:w-[60%] flex flex-col gap-4">
					<div>
						<div className="relative bg-no-repeat bg-cover bg-center bg-[url('../src/assets/noman.jpg')] flex flex-col items-center h-[30vh] p-20 justify-center z-[2]">
							<div className="flex flex-col items-center absolute -bottom-48 justify-center">
								<div className="bg-gradient-to-r from-violet-800 to-sky-500 rounded-full p-[5px]">
									<div className="bg-black rounded-full p-[5px]">
										<img
											onClick={() => {setPreviewImage(userData?.profileimage as string); setViewImage(true)}}
											src={
												userData?.profileimage
													? userData?.profileimage
													: placeholderImage
											}
											className="w-44 h-44 rounded-full object-cover cursor-pointer"
										/>
									</div>
									{userData?.userId == userId &&
										<CameraAltRounded
											onClick={() => setImageUpdate(true)}
											sx={{ fontSize: 50 }}
											className="absolute right-0 top-36 bg-gray-900 p-2 text-light border border-gray-700 rounded-full cursor-pointer bottom-12 active:scale-95 hover:scale-105"
										/>
									
									}
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
										<p>
											{posts && posts.length} Post
											{posts ? posts.length != 1 && "s" : null}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-center">
							<div className="bg-primary-200 h-[260px] md:h-[220px] w-full relative z-[1] rounded-b-lg">
								{userData?.userId == userId && (
									<div className="absolute right-[25%] md:right-4 bottom-4 flex justify-center gap-2">
										<div onClick={handleStoryToggle}>
											<ButtonComp color={"#0C88EF"}>
												<Add />
												Add to story
											</ButtonComp>
										</div>
										<ButtonComp color={"#010A13"}>
											<Edit />
											Edit profile
										</ButtonComp>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="bg-primary-200 flex gap-2 p-2 justify-center rounded-md sticky top-[73px] z-10 shadow-2xl border border-gray-700/60">
						{Tabs.map((tab, index) => (
							<div
								key={index}
								onClick={() => setActiveTab(tab)}
								className={`px-5 py-2 rounded-md transition duration-150 capitalize cursor-pointer hover:bg-gray-700/50 hover:outline outline-1 hover:outline-gray-600 text-white ${
									activeTab == tab &&
									"bg-gray-700 outline outline-1 outline-gray-400"
								}`}>
								{tab}
							</div>
						))}
					</div>
					<div className="flex flex-col items-start lg:flex-row gap-5">
						<div className="bg-primary-200 w-full lg:max-w-[550px] p-5 xl:sticky top-[160px] rounded-lg border border-gray-700/50">
							<div >
								<h1 className="text-2xl text-light text-center">About <span className="capitalize text-primary-100">{userData?.username}</span></h1>
								<hr className="border-1 border-gray-700 my-6"/>
								<ProfileDetail userId={userId} userData={userData} isOpen={isOpen} setIsOpen={setIsOpen}/>
							</div>
						</div>
						<div className="w-full flex flex-col gap-4">
							{userData?.userId == userId && <PostComponent />}
							<h1 className="text-light text-3xl text-center capitalize">
								{userData?.userId == userId
									? "Your"
									: `${userData?.username}'s`}{" "}
								Posts
							</h1>
							{posts && posts.length ? (
								<div className="flex flex-col gap-6 ">
									{posts.map((post: object, index: number) => (
										<div key={index}>
											<Box {...post} />
										</div>
									))}
								</div>
							) : (
								<p className="text-center text-light text-xl mt-4">
									😞
									{userData?.userId == userId ? (
										"You haven't"
									) : (
										<span className="capitalize">
											{userData?.username} hasn't
										</span>
									)}{" "}
									posted anything yet
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
			{isOpen && <DetailModal setIsOpen={setIsOpen}/>}
			{isToggled && <StoryModal handleStoryToggle={handleStoryToggle} />}
			<Toaster />
			{imageUpdate && <ImageUpdate  setImageUpdate={setImageUpdate}/>}
			{viewImage && <ProfileImage profileimage={previewimage} username={userData?.username as string} setViewImage={setViewImage}/>}
		</div>
	);
};

export default profile;
