import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseURL } from "../../utils/Link";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { Tabs } from "../../utils/utilObjects";
import { UserInfo, Userdata } from "../../types/Types";
import ImageUpdate from "../../components/Detail/ImageUpdate";
import StoryModal from "../../components/Modals/StoryModal";
import DetailModal from "../../components/Detail/UpdateModal";
import ProfileImage from "../../components/Posts/Preview/ProfileImage";
import Skeleton from "react-loading-skeleton";
import { Posts } from "../../types/Types";

import Button from "./components/Button";
import Image from "./components/Image";
import { renderContent } from "./func/renderContext";
const profile = () => {
	const { id } = useParams();
	const [loggedInUserData, setLoggedInUserData] = useState<Userdata | null>(
		null
	);
	const [isToggled, setIsToggled] = useState(false);
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
	const [pending, setPending] = useState(false);

	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const fetchloggedInUser = useCallback(() => {
		try {
			axios.get(`${BaseURL}/user/${userId}`).then((response) => {
				setLoggedInUserData(response.data);
			});
		} catch (error) {
			console.log(error);
		}
	}, [userId]);
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
			toast.error("Something went wrong ,Refresh the page or Try again later.");
		}
		setLoading(false);
	};
	useEffect(() => {
		fetchloggedInUser();
		fetchProfile(`${BaseURL}/user/${id}`);
		fetchUserPosts(`${BaseURL}/post/${id}`);
	}, [id]);

	if (userData) {
		if (userData?.userId == userId) {
			document.title = "Your profile";
		} else {
			document.title = `Profile | ${
				userData?.username &&
				userData.username.charAt(0).toUpperCase() + userData.username.slice(1)
			}`;
		}
	} else {
		document.title = "Facebook";
	}
	const findMutualFriends = () => {
		if (userData?.userId !== userId) {
			return "2";
		}
	};
	return (
		<section className="min-h-screen w-full pb-20 bg-background-primary ">
			<div className="h-[45vh]  w-full absolute bg-gray-800/30 "></div>
			<div className="flex w-full justify-center ">
				<div className="w-full px-3 md:px-16 lg:px-0 lg:w-[80%] 2xl:w-[60%] flex flex-col gap-4">
					<div>
						<div className="relative bg-no-repeat bg-cover bg-center bg-[url('../src/assets/noman.jpg')] flex flex-col items-center h-[30vh] p-20 justify-center z-[2]">
							<div className="flex flex-col items-center absolute -bottom-48 justify-center">
								{loading ? (
									<Skeleton circle width={210} height={210} />
								) : (
									<Image
										setImageUpdate={setImageUpdate}
										setPreviewImage={setPreviewImage}
										setViewImage={setViewImage}
										userData={userData!}
										userId={userId}
									/>
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
											{userData?.firstname} {userData?.lastname}
										</p>
										<div className="flex gap-2 text-gray-400">
											<p>@{userData?.username.split(" ")[0]}</p>
											<span>•</span>
											<p>{userData?.email}</p>
										</div>
										<div className="text-gray-400 flex gap-5 mt-4 ">
											<div className="flex gap-x-0.5">
												<p className="text-sm">
													{userData && friendCount} friend
													{friendCount !== 1 && "s"}
												</p>
												<p className="text-sm">
													(
													{userData &&
														loggedInUserData &&
														(findMutualFriends() as any)}{" "}
													mutual)
												</p>

											</div>
											<p className="text-sm">
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
								<Button
									pending={pending}
									isFriend={isFriend}
									setFriendCount={setFriendCount}
									setPending={setPending}
									setIsFriend={setIsFriend}
									friendCount={friendCount!}
									userData={userData!}
									userId={userId}
									toggleStory={() => setIsToggled(true)}
									setIsOpen={setIsOpen}
								/>
							</div>
						</div>
					</div>
					<div className="bg-primary-200 flex flex-wrap gap-2  p-2 justify-center rounded-md md:sticky md:top-[73px] z-[2] shadow-2xl border border-gray-700/60">
						{Tabs.map((tab, index) => (
							<div
								key={index}
								onClick={() => setActiveTab(tab)}
								className={`px-5 py-2 rounded-md relative transition duration-150 capitalize cursor-pointer hover:bg-primary-100/50 hover:ring-1 hover:ring-gray-700 text-white ${
									activeTab == tab && "bg-primary-100/70  ring-1 ring-gray-600"
								}`}>
								<div>
									{index === 0 && (
										<p className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-red-700 text-white rounded-full text-sm">
											{posts?.length}
										</p>
									)}
									{index === 2 && (
										<p className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-red-700 text-white rounded-full text-sm">
											{friendCount}
										</p>
									)}
									{tab}
								</div>
							</div>
						))}
					</div>
					<div>
						{renderContent(
							activeTab,
							loading,
							userData,
							userId,
							isOpen,
							setIsOpen,
							posts,
							setPosts
						)}
					</div>
				</div>
			</div>
			<DetailModal onClose={() => setIsOpen(false)} isOpen={isOpen} />
			<StoryModal onClose={() => setIsToggled(false)} isOpen={isToggled} />
			<ImageUpdate onClose={() => setImageUpdate(false)} isOpen={imageUpdate} />
			<ProfileImage
				isOpen={viewImage}
				onClose={() => setViewImage(false)}
				profileimage={previewimage as string}
				username={userData?.username as string}
				email={userData?.email as string}
			/>
		</section>
	);
};

export default profile;
