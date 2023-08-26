import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { useEffect, useState } from "react";
import { UserInfo, Userdata } from "../../types/Types";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import FriendLoader from "../../components/Loaders/Skeleton/FriendPageLoader";
import placeholderAvatar from "../../assets/avatar.webp";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { Button } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { HiUsers } from "react-icons/hi2";

const index = () => {
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: UserInfo } };
	const [limit, setLimit] = useState(5);
	const [users, setUsers] = useState<Userdata[] | null>(null);
	let [allUsers, setAllUsers] = useState<Userdata[] | null>(null);
	const populateFriends = async () => {
		const { data } = await axios.get(`${BaseURL}/user/${userId}/friends`);
		setUsers(data.data);
	};
	const removeFriend = async (friendId: string) => {
		const { data } = await axios.delete(`${BaseURL}/user/${userId}/friends`, {
			data: {
				friendId: friendId,
			},
		});
		if (data?.success) {
			toast.success(data?.msg);
			populateFriends();
		} else {
			toast.error(data?.msg);
		}
	};
	const addFriend = async (friendId: string) => {
		const { data } = await axios.post(`${BaseURL}/user/${userId}/friends`, {
			friendId: friendId,
		});
		if (data?.success) {
			toast.success(data?.msg);
			populateFriends();
		} else {
			toast.error(data?.msg);
		}
	};
	const fetchUsers = async () => {
		const { data } = await axios.get(`${BaseURL}/user/`);
		setAllUsers(data);
	};
	useEffect(() => {
		populateFriends();
		fetchUsers();
	}, []);

	allUsers &&
		(allUsers = (allUsers as Userdata[]).filter(
			(user) => user.userId !== userId
		));

	allUsers &&
		users &&
		(allUsers = allUsers.filter(
			(suggest) => !users.some((friend) => friend.userId === suggest.userId)
		));
	return (
		<div className="h-full w-full min-h-[100vh] max-w-[750px] sm:min-w-[550px] flex flex-col gap-10">
			{users ? (
				<div className="flex flex-col gap-4 rounded-xl ">
					{users.length > 0 ? (
						<div className="flex flex-col gap-6">
							<h1 className="text-light text-2xl text-center ">
								Your friends{" "}
								<span className="text-blue-base text-xl">
									({users?.length})
								</span>
							</h1>
							{users.map((user, index) => (
								<div
									className="bg-primary-200 p-6 rounded-lg border border-gray-800 relative"
									key={index}>
									<div className="flex items-center gap-4">
										<img
											src={user.profileimage || placeholderAvatar}
											className="w-20 h-20 sm:h-32 sm:w-32 object-cover rounded-md"
										/>

										<div className="flex flex-col gap-1 w-full">
											<Link to={`/profile/${user.userId}`}>
												<p className="text-lg text-white capitalize">
													{user.firstname} {user.lastname}
												</p>
												<div className="flex text-gray-400 gap-1">
													<p className="text-base">@{user?.username}</p>
													<span>•</span>
													<p className="text-base">{user?.email}</p>
												</div>
											</Link>
											<p className="text-gray-300 text-sm">{user?.bio}</p>
											<div className="flex justify-end sm:absolute top-3 right-3 gap-3">
												<Button
													onClick={() => removeFriend(user?.userId)}
													sx={{
														color: "white",
														backgroundColor: "#0C88EF",
														textTransform: "capitalize",
														borderRadius: "40px",
														mt: "10px",
														alignSelf: "flex-start",
														p: "10px",
														display: "flex",
														gap: "5px",
														"&:hover": { backgroundColor: "#3293e3" },
													}}>
													<HiUserRemove size={18} />
													Remove friend
												</Button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-lg  text-white p-10 bg-primary-200 rounded-md ring-1 ring-primary-100 grid place-content-center">
							<p className="flex gap-2 items-center">
								<HiUsers size={20} />
								You have no friends!
							</p>
						</div>
					)}
				</div>
			) : (
				<FriendLoader />
			)}
			{allUsers && (
				<div className="flex flex-col gap-6">
					<h1 className="text-light text-2xl text-center ">
						People you may know
					</h1>

					{allUsers.length > 0 ? (
						<div className="flex flex-col gap-4">
							{allUsers.slice(0, limit).map((user, index) => (
								<div
									className="bg-primary-200/70 p-6 rounded-lg border border-gray-800 relative"
									key={index}>
									<div className="flex items-center gap-4">
										<img
											src={user.profileimage || placeholderAvatar}
											className="w-20 h-20 sm:h-32 sm:w-32 object-cover rounded-md"
										/>

										<div className="flex flex-col gap-1 w-full">
											<Link to={`/profile/${user.userId}`}>
												<p className="text-lg text-white capitalize">
													{user.firstname} {user.lastname}
												</p>
												<div className="flex text-gray-400 gap-1">
													<p className="text-base">@{user?.username}</p>
													<span>•</span>
													<p className="text-base">{user?.email}</p>
												</div>
											</Link>
											<p className="text-gray-300 text-sm">{user?.bio}</p>
										</div>
									</div>
									<div className="flex justify-end sm:absolute top-3 right-3 gap-3">
										<Button
											onClick={() => addFriend(user?.userId)}
											sx={{
												color: "white",
												backgroundColor: "#0C88EF",
												textTransform: "capitalize",
												borderRadius: "40px",
												mt: "10px",
												p: "10px",
												display: "flex",
												gap: "5px",
												"&:hover": { backgroundColor: "#3293e3" },
											}}>
											<HiUserAdd size={18} />
											Add friend
										</Button>
									</div>
								</div>
							))}
							<div className="flex justify-center">
								<Button
									onClick={() => setLimit((prev) => prev + 5)}
									className="group"
									sx={{
										color: "white",
										backgroundColor: "#0C88EF",
										textTransform: "capitalize",
										borderRadius: "40px",
										mt: "10px",
										pl: "20px",
										py: "10px",
										display: "flex",
										"&:hover": { backgroundColor: "#3293e3" },
									}}>
									See more
									<span className="invisible opacity-0 transition-all duration-700 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 group-hover:visible">
										<ChevronRight />
									</span>
								</Button>
							</div>
						</div>
					) : (
						<div className=" text-lg text-center text-white p-4 pb-6 bg-primary-100/25">
							😞 No suggestions available!
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default index;
