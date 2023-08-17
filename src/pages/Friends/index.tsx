import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { useEffect, useState } from "react";
import { UserInfo, Userdata } from "../../types/Types";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import ButtonComp from "../../components/Buttons/Button";
import Sidebar from "../../components/SideBar/SideLeft";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import FriendLoader from "../../components/Loaders/Skeleton/FriendPageLoader";
import {
	PersonAddAlt1Outlined,
	PersonRemoveAlt1Outlined,
} from "@mui/icons-material";
const index = () => {
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: UserInfo } };
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
		<div className="min-h-screen bg-gray-950 pb-20">
			<div className="p-2 md:p-10 2xl:p-0 flex 2xl:justify-center">
				<div className="w-full 2xl:w-3/5 flex justify-center gap-6">
					<Sidebar />
					<div className="flex flex-col gap-10 mt-8 w-full max-w-[800px] 2xl:max-w-none">
						{users ? (
							<div className="flex flex-col gap-4 bg-gray-900 p-4 rounded-xl  border border-gray-800">
								<h1 className="text-light text-2xl text-center ">
									Your friends{" "}
									<span className="text-primary-100">({users?.length})</span>
								</h1>
								{users.length > 0 ? (
									<div className="flex flex-col gap-6">
										{users.map((user) => (
											<div className="bg-primary-200 p-4 rounded-lg border border-gray-800">
												<div className="flex flex-col sm:flex-row items-center gap-4">
													<div className="bg-gradient-to-r from-sky-600 to-violet-900 rounded-full p-1">
														<div className="bg-primary-200 rounded-full p-1">
															<img
																src={user.profileimage}
																className="w-32 h-32 min-h-[130px] min-w-[130px] object-cover rounded-full"
															/>
														</div>
													</div>
													<div className="flex flex-col gap-1 w-full">
														<Link to={`/profile/${user.userId}`}>
															<p className="text-xl text-white capitalize">
																{user.username}
															</p>
															<p className="text-light">{user.email}</p>
														</Link>
														<p className="text-gray-500">{user.bio}</p>
														<div className="flex flex-col md:flex-row w-full gap-3">
															<div
																onClick={() => removeFriend(user?.userId)}
																className="w-full max-w-[300px]">
																<ButtonComp color="#0a5796">
																	<PersonRemoveAlt1Outlined />
																	Remove friend
																</ButtonComp>
															</div>

															<Link
																to={`/profile/${user?.userId}`}
																className="w-full">
																<button className="text-light border p-2 border-gray-700 max-w-[300px] w-full h-full rounded-md hover:bg-gray-700/20">
																	View profile
																</button>
															</Link>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="text-base text-center text-light/60 pb-6">
										😞 You have no friends!
									</div>
								)}
							</div>
						) : (
							<FriendLoader />
						)}
						{allUsers && (
							<div className="flex flex-col gap-6 bg-gray-900 p-4 rounded-xl border border-gray-800">
								<h1 className="text-light text-2xl text-center ">
									Suggestions
								</h1>

								{allUsers.length > 0 ? (
									<div className="flex flex-col gap-4">
										{allUsers.map((user) => (
											<div className="bg-primary-200 p-4 rounded-lg border border-gray-800">
												<div className="flex flex-col sm:flex-row items-center gap-4">
													<div className="bg-gradient-to-r from-sky-600 to-violet-900 rounded-full p-1">
														<div className="bg-primary-200 rounded-full p-1">
															<img
																src={user.profileimage}
																className="w-32 h-32 min-h-[130px] min-w-[130px] object-cover rounded-full"
															/>
														</div>
													</div>
													<div className="flex flex-col gap-1 w-full">
														<Link to={`/profile/${user.userId}`}>
															<p className="text-xl text-white capitalize">
																{user.username}
															</p>
															<p className="text-light">{user.email}</p>
														</Link>
														<p className="text-gray-500">{user.bio}</p>
														<div className="flex flex-col md:flex-row w-full gap-3">
															<div
																onClick={() => addFriend(user?.userId)}
																className="w-full max-w-[300px]">
																<ButtonComp color="#0a5796">
																	<PersonAddAlt1Outlined />
																	Add friend
																</ButtonComp>
															</div>

															<Link
																to={`/profile/${user?.userId}`}
																className="w-full">
																<button className="text-light border border-gray-700 p-2 max-w-[300px] w-full h-full rounded-md hover:bg-gray-700/20">
																	View profile
																</button>
															</Link>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="text-base text-center text-light/60 pb-6">
										😞 No suggestions available!
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default index;
