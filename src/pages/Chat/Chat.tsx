import Navbar from "../../components/Nav";
import { useEffect, useState } from "react";
import { BaseURL } from "../../utils/Link";
import axios from "axios";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { UserInfo, Userdata } from "../../types/Types";
import { Link } from "react-router-dom";
import PeopleLoader from "../../components/Loaders/Skeleton/People";
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
		<div className="h-screen bg-gray-950">
			<Navbar />
			<div className="flex w-4/5 justify-center p-4">
				<div>
					{users.length !== 0 ? (
						<div className="flex flex-col gap-4">
							{allUsers.map((user, index) => (
								<Link to={`/profile/${user?.userId}`} key={index}>
									<div className="flex gap-2 items-center">
										<div className="bg-primary-100 p-1 rounded-full">
											<img
												src={user?.profileimage}
												className="h-12 w-12 rounded-full object-cover"
											/>
										</div>
										<div>
											<p className="text-light cursor-pointer capitalize">
												{user?.username}
											</p>
											<p className="text-xs text-gray-500">{user?.email}</p>
										</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<PeopleLoader />
					)}
				</div>
				<div className="w-[1000px]">

        </div>
			</div>
		</div>
	);
};

export default Chat;
