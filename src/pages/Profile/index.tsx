import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseURL } from "../../utils/Link";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import {
	Add,
	CameraAltRounded,
	Edit,
	PersonAddAlt1Outlined,
} from "@mui/icons-material";
import { Tabs } from "../../utils/utilObjects";
import { UserInfo, Userdata } from "../../types/Types";
import ImageUpdate from "../../components/Detail/ImageUpdate";
import StoryModal from "../../components/Modals/StoryModal";
import placeholderImage from "../../assets/avatar.webp";
import DetailModal from "../../components/Detail/UpdateModal";
import ProfileImage from "../../components/Posts/Preview/ProfileImage";
import Skeleton from "react-loading-skeleton";
import { Posts } from "../../types/Types";
import PostLayout from "./layout/Posts";
import ButtonComp from "../../components/Buttons/Button";
import FriendLayout from "./layout/FriendLayout";
import GroupLayout from "./layout/GroupLayout";
const profile = () => {
	const { id } = useParams();
	const [isToggled, setIsToggled] = useState(false);
	const handleStoryToggle = () => {
		setIsToggled(!isToggled);
	};
	const [userData, setUserData] = useState<Userdata | null>(null);
	const [posts, setPosts] = useState<Posts[] | null>(null);
	const [activeTab, setActiveTab] = useState("posts");
	const [isOpen, setIsOpen] = useState(false);
	const [imageUpdate, setImageUpdate] = useState(false);
	const [viewImage, setViewImage] = useState(false);
	const [previewimage, setPreviewImage] = useState<string | null>(null);
	const [friendCount, setFriendCount] = useState(userData?.friendList.length);
	const [isFriend, setIsFriend] = useState(false);
	const [loading, setLoading] = useState(false);
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
			setFriendCount(data?.friendList.length);
			const friends = data?.friendList;
			if (friends) {
				const hasFriend = friends.some(
					(friend: Userdata) => friend.userId === userId
				);
				setIsFriend(hasFriend);
			}
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong , Try again later.");
		}
	};
	const fetchUserPosts = async (url: string) => {
		setLoading(true);
		try {
			const {
				data: { data },
			} = await axios.get(url);
			setPosts(data);
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong , Try again later.");
		}
		setLoading(false);
	};
	useEffect(() => {
		fetchProfile(`${BaseURL}/user/${id}`);
		fetchUserPosts(`${BaseURL}/post/${id}`);
	}, []);

	if (userData) {
		if (userData?.userId == userId) {
			document.title = "Your profile";
		} else {
			document.title = `Profile | ${
				userData?.username
					? userData.username.charAt(0).toUpperCase() +
					  userData.username.slice(1)
					: ""
			}`;
		}
	} else {
		document.title = "Facebook";
	}
	const submitFriendRequest = async () => {
		if (isFriend) {
			const { data } = await axios.delete(`${BaseURL}/user/${userId}/friends`, {
				data: {
					friendId: userData?.userId,
				},
			});
			if (data?.success) {
				toast.success(data?.msg);
				setIsFriend(false);
				setFriendCount((friendCount as number) - 1);
			} else {
				toast.error(data?.msg);
			}
		} else {
			const { data } = await axios.post(`${BaseURL}/user/${userId}/friends`, {
				friendId: userData?.userId,
			});
			if (data?.success) {
				toast.success(data?.msg);
				setIsFriend(true);
				setFriendCount((friendCount as number) + 1);
			} else {
				toast.error(data?.msg);
			}
		}
	};

	const renderContent = () => {
		switch (activeTab) {
			case "posts":
				return (
					<PostLayout
						loading={loading}
						userData={userData}
						userId={userId}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						posts={posts}
					/>
				);

			case "friends":
				return (
					<FriendLayout
						friends={userData?.friendList as Userdata[]}
						userData={userData as Userdata}
					/>
				);
			case "groups":
				return <GroupLayout userData={userData as Userdata} />;

			default:
				return (
					<PostLayout
						loading={loading}
						userData={userData}
						userId={userId}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						posts={posts}
					/>
				);
		}
	};
	return (
		<div className="min-h-screen w-full pb-20 bg-gray-950 ">
			<div className="h-[45vh]  w-full absolute bg-gray-800/30 "></div>
			<div className="flex w-full justify-center ">
				<div className="w-full px-3 md:px-16 2xl:px-0 2xl:w-[60%] flex flex-col gap-4">
					<div>
						<div className="relative bg-no-repeat bg-cover bg-center bg-[url('../src/assets/noman.jpg')] flex flex-col items-center h-[30vh] p-20 justify-center z-[2]">
							<div className="flex flex-col items-center absolute -bottom-48 justify-center">
								{loading ? (
									<Skeleton circle width={210} height={210} />
								) : (
									<div className="bg-gradient-to-r from-violet-800 to-sky-500 rounded-full p-[5px]">
										<div className="bg-black rounded-full p-[5px]">
											<img
												onClick={() => {
													setPreviewImage(userData?.profileimage as string);
													setViewImage(true);
												}}
												src={
													userData?.profileimage
														? userData?.profileimage
														: placeholderImage
												}
												className="w-44 h-44 rounded-full object-cover cursor-pointer"
											/>
										</div>
										{userData?.userId == userId && (
											<CameraAltRounded
												onClick={() => setImageUpdate(true)}
												sx={{ fontSize: 50 }}
												className="absolute right-0 top-36 bg-gray-900 p-2 text-light border border-gray-700 rounded-full cursor-pointer bottom-12 active:scale-95 hover:scale-105"
											/>
										)}
									</div>
								)}
								{loading ? (
									<div className="flex flex-col  justify-center items-center gap-1 mt-1">
										<Skeleton width={200} />
										<Skeleton width={160} />
										<div className="flex gap-2">
											<Skeleton width={100} />
											<Skeleton width={100} />
										</div>
									</div>
								) : (
									<div className="flex flex-col  justify-center items-center gap-1">
										<p className="capitalize text-4xl text-light">
											{userData?.username}
										</p>
										<p className="text-light">
											{userData?.firstname} {userData?.lastname}
										</p>
										<p className="text-light/30">{userData?.email}</p>
										<div className="text-light/30 font-black flex gap-7">
											<p>
												{userData && friendCount} Friend
												{friendCount !== 1 && "s"}
											</p>
											<p>
												{posts && posts.length} Post
												{posts && posts.length !== 1 && "s"}
											</p>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="flex justify-center">
							<div className="bg-primary-200 h-[260px] md:h-[220px] w-full relative z-[1] rounded-b-lg">
								{userData?.userId == userId ? (
									<div className="absolute right-[25%] md:right-4 bottom-4 flex justify-center gap-2">
										<div onClick={handleStoryToggle}>
											<ButtonComp color={"#0C88EF"}>
												<Add />
												Add to story
											</ButtonComp>
										</div>
										<div onClick={() => setIsOpen(true)}>
											<ButtonComp color={"#010A13"}>
												<Edit />
												Edit profile
											</ButtonComp>
										</div>
									</div>
								) : isFriend ? (
									<div
										className="absolute right-[25%] md:right-4 bottom-4 flex justify-center gap-2"
										onClick={submitFriendRequest}>
										<ButtonComp color="#0C88EF">
											<PersonAddAlt1Outlined />
											Remove friend
										</ButtonComp>
									</div>
								) : (
									<div
										className="absolute right-[25%] md:right-4 bottom-4 flex justify-center gap-2"
										onClick={submitFriendRequest}>
										<ButtonComp color="#0C88EF">
											<PersonAddAlt1Outlined />
											Add friend
										</ButtonComp>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="bg-primary-200 flex flex-wrap gap-2  p-2 justify-center rounded-md sticky top-[73px] z-10 shadow-2xl border border-gray-700/60">
						{Tabs.map((tab, index) => (
							<div
								key={index}
								onClick={() => setActiveTab(tab)}
								className={`px-5 py-2 rounded-md relative transition duration-150 capitalize cursor-pointer hover:bg-gray-700/50 hover:outline outline-1 hover:outline-gray-600 text-white ${
									activeTab == tab &&
									"bg-gray-700 outline outline-1 outline-gray-400"
								}`}>
								<div>
									{index === 0 && <p className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-red-700 text-white rounded-full text-sm">{posts?.length}</p>}
									{index === 2 && <p className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-red-700 text-white rounded-full text-sm">{userData?.friendList.length}</p>}
									{tab}
								</div>
							</div>
						))}
					</div>
					<div>{renderContent()}</div>
				</div>
			</div>
			{isOpen && <DetailModal setIsOpen={setIsOpen} />}
			{isToggled && <StoryModal handleStoryToggle={handleStoryToggle} />}
			{imageUpdate && <ImageUpdate setImageUpdate={setImageUpdate} />}
			{viewImage && (
				<ProfileImage
					profileimage={previewimage as string}
					username={userData?.username as string}
					setViewImage={setViewImage}
					email={userData?.email as string}
				/>
			)}
		</div>
	);
};

export default profile;
