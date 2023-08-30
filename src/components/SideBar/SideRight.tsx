import { LuSettings2 } from "react-icons/lu";
import { trendDummyData } from "../../utils/utilObjects";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { UserInfo, Userdata } from "../../types/types";
import { useEffect, useState } from "react";
import { BaseURL } from "../../utils/Link";
import PeopleLoader from "../Loaders/Skeleton/People";
import placeholderImage from "../../assets/avatar.webp";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PersonAdd } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { fetchFriends } from "../../api/func";
import { toast } from "react-hot-toast";

const SideRight = () => {
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: UserInfo } };

	let [users, setUsers] = useState<Array<Userdata>>([]);
	let [allUsers, setAllUsers] = useState<Userdata[] | null>(null);
	const fetchPeople = async () => {
		const { data } = await axios.get(`${BaseURL}/user/`);
		setAllUsers(data);
	};
	async function fetchUserFriends() {
		const result = await fetchFriends(userId);
		setUsers(result);
	}

	const addFriend = async (friendId: string) => {
		const { data } = await axios.post(`${BaseURL}/user/${userId}/friends`, {
			friendId: friendId,
		});
		if (data?.success) {
			toast.success(data?.msg);
			fetchUserFriends();
		} else {
			toast.error(data?.msg);
		}
	};
	useEffect(() => {
		fetchPeople();
		fetchUserFriends();
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
	const navigate = useNavigate();
	return (
		<div className="hidden xl:flex h-fit flex-col sticky top-[90px] w-full 2xl:min-w-[400px] max-w-[400px]">
			<div className="bg-primary-200 p-5 flex rounded-lg w-full flex-col gap-4 ">
				<div className="flex justify-between items-center text-white ">
					<h1 className="text-xl">Trends for you</h1>
					<LuSettings2
						size={30}
						className="hover:bg-gray-600/40 p-1.5 rounded-md cursor-pointer"
					/>
				</div>
				<div className="flex flex-col space-y-5">
					{trendDummyData.map((item, index) => (
						<div
							key={index}
							className="flex justify-between gap-12 pb-4 items-end border-b-2 border-gray-700/70 p-2 font-">
							<div className="space-y-2">
								<h1 className="text-white">{item.title}</h1>
								<p className="text-gray-500/60 font-semibold text-[13px]">
									{item.subtitle}
								</p>
							</div>
							<p className="text-gray-500/60 font-semibold text-[13px]">
								{item.statistics}
							</p>
						</div>
					))}
				</div>
				<p className="text-blue-base hover:underline font-semibold mt-4 cursor-pointer">
					Show more
				</p>
			</div>
			<div className="mt-3 bg-primary-200 p-5 rounded-lg w-full space-y-6 ">
				<h1 className="text-white text-xl">People you may know</h1>
				{allUsers ? (
					allUsers.length === 0 ? (
						<div className="text-lg text-gray-400">
							No suggestions available
						</div>
					) : (
						<div className="flex flex-col gap-7">
							{allUsers.slice(0, 5).map((user, index) => (
								<div
									className="flex gap-2 justify-between items-center"
									key={index}>
									<Link to={`/profile/${user?.userId}`}>
										<div className="flex gap-2  items-center">
											<img
												src={user?.profileimage || placeholderImage}
												className="h-12 w-12 rounded-full object-cover"
											/>
											<div className="space-y-1">
												<p className="text-light cursor-pointer  capitalize">
													{user?.firstname} {user?.lastname}
												</p>
												<div className="flex gap-1 text-gray-400/70">
													<p className="text-sm whitespace-nowrap capitalize">
														@{user.username}
													</p>
													<span>•</span>
													<p className="text-sm  whitespace-nowrap">
														{user?.email}
													</p>
												</div>
											</div>
										</div>
									</Link>
									<Tooltip title="Add friend">
										<PersonAdd
											className="text-blue-base hover:scale-110 transition cursor-pointer"
											onClick={() => addFriend(user?.userId)}
										/>
									</Tooltip>
								</div>
							))}
							<Button
								onClick={() => navigate("/i/friends")}
								sx={{
									color: "white",
									backgroundColor: "#0C88EF",
									textTransform: "capitalize",
									borderRadius: "40px",
									mt: "10px",
									alignSelf: "flex-start",
									px: "25px",
									py: "12px",
									"&:hover": { backgroundColor: "#3293e3" },
								}}>
								See more
							</Button>
						</div>
					)
				) : (
					<PeopleLoader />
				)}
			</div>
		</div>
	);
};

export default SideRight;
