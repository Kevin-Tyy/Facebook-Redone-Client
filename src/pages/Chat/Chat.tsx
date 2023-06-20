import Navbar from "../../components/Nav";
import { useEffect, useState } from "react";
import { BaseURL } from "../../utils/Link";
import axios from "axios";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { UserInfo, Userdata } from "../../types/Types";
import { Link } from "react-router-dom";
import PeopleLoader from "../../components/Loaders/Skeleton/People";
import {
	EditCalendarRounded,
	MoreHoriz,
	Search,
	VideoCallRounded,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
const Chat = () => {
	const [users, setUsers] = useState<Userdata[]>([]);
	document.title = "Facebook | Chats";
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: UserInfo } };
	const fetchUsers = async () => {
		const { data } = await axios.get(`${BaseURL}/user/`);
		setUsers(data);
		console.log(data);
	};
	useEffect(() => {
		fetchUsers();
	}, []);
	const allUsers = users.filter((user) => user.userId !== userId);

	return (
		<div className="min-h-screen bg-gray-950">
			<Navbar />
			<div className="flex justify-center p-4 h-full">
				<div className="w-full xl:w-4/5 flex gap-2 md:gap-8 h-[90vh]">
					<div className="flex flex-col gap-8 sticky top-0 w-[70px] md:w-[110px] xl:w-auto bg-gray-900/40 p-2 md:p-6 rounded-lg border border-gray-800">
						<div className="flex flex-col gap-6">
							<div className="justify-between gap-44 hidden xl:flex">
								<h1 className="text-2xl text-light">Chats</h1>
								<div className="flex gap-2">
									<div className="p-1.5 text-light bg-gray-800/50 rounded-full cursor-pointer active:bg-gray-800/20 transition hover:bg-gray-800/80">
										<MoreHoriz />
									</div>
									<div className="p-1.5 text-light bg-gray-800/50 rounded-full cursor-pointer active:bg-gray-800/20 transition hover:bg-gray-800/80">
										<VideoCallRounded />
									</div>
									<div className="p-1.5 text-light bg-gray-800/50 rounded-full cursor-pointer active:bg-gray-800/20 transition hover:bg-gray-800/80">
										<EditCalendarRounded />
									</div>
								</div>
							</div>
							<div className="bg-gray-900/80 w-[50px] xl:w-auto py-2.5 px-3 flex items-center gap-3 rounded-full focus-within:outline outline-1 outline-gray-700">
								<Search className="text-white" />
								<input
									type="text"
									className="bg-transparent outline-none w-full text-white"
									placeholder="Search facebook"
								/>
							</div>
						</div>
						{users.length !== 0 ? (
							<div className="flex flex-col gap-6 pb-6 items-center xl:items-start">
								{allUsers.map((user, index) => (
									<Tooltip title={user?.username} placement="right" key={index}>
										<Link to={`/profile/${user?.userId}`} >
											<div className="flex gap-2 items-center">
												<div className="bg-primary-100 p-1 rounded-full">
													<img
														src={user?.profileimage}
														className="h-8 w-8 md:h-12 md:w-12 rounded-full object-cover"
													/>
												</div>
												<div className="hidden xl:block">
													<p className="text-light cursor-pointer capitalize">
														{user?.username}
													</p>
													<p className="text-xs text-gray-500">{user?.email}</p>
												</div>
											</div>
										</Link>
									</Tooltip>
								))}
							</div>
						) : (
							<PeopleLoader />
						)}
					</div>
					<div className="flex-grow bg-gray-900/40 rounded-lg border border-gray-800 flex justify-center items-center">
						<h1 className="text-3xl bg-gradient-to-r from-sky-600 to-violet-900 text-transparent bg-clip-text font-black p-10">
							Select a friend to chat
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
