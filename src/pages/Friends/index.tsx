import { useSelector } from "react-redux";
import Navbar from "../../components/Nav";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { useEffect, useState } from "react";
import { UserInfo, Userdata } from "../../types/Types";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import ButtonComp from "../../components/Buttons/Button";
import Sidebar from "../../components/SideBar/SideLeft";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const index = () => {
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: UserInfo } };
	const [users, setUsers] = useState<Userdata[]>([]);
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
		} else {
			toast.error(data?.msg);
		}
	};
	console.log(users);
	useEffect(() => {
		populateFriends();
	}, []);
	return (
		<div className="min-h-screen bg-gray-950">
			<Navbar />
			<div className="p-10 flex justify-center">
				<div className="w-3/5 flex gap-6">
					<Sidebar />
					<div className="flex flex-col gap-4 w-full">
						{users && (
							<div>
								{users.length > 0 ? (
									<div>
										{users.map((user) => (
											<div className="bg-primary-200 p-4">
												<div className="flex items-center gap-4">
													<div className="bg-gradient-to-r from-sky-600 to-violet-900 rounded-full p-1">
														<div className="bg-primary-200 rounded-full p-1">
															<img
																src={user.profileimage}
																className="w-32 h-32 object-cover rounded-full"
															/>
														</div>
													</div>
													<div className="flex flex-col gap-1">
														<Link to={`/profile/${user.userId}`}>
															<p className="text-xl text-white capitalize">
																{user.username}
															</p>
															<p className="text-light">{user.email}</p>
														</Link>
														<p className="text-gray-500">{user.bio}</p>
														<div onClick={() => removeFriend(user?.userId)}>
															<ButtonComp color="#0a5796">
																Remove friend
															</ButtonComp>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="text-2xl text-center text-light">
										😞 You have no friends!	
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
