import { Avatar, Button } from "@mui/material";
import image from "../../assets/bg-cover.jpg";
import { useEffect, useState } from "react";
import { BaseURL } from "../../utils/Link";
import axios from "axios";
import { UserInfo, Userdata } from "../../types/Types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import PeopleLoader from "../Loaders/Skeleton/People";
const SideRight = () => {
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: UserInfo } };
	const [users, setUsers] = useState<Array<Userdata>>([]);
	const fetchPeople = async () => {
		const { data } = await axios.get(`${BaseURL}/user/`);
		setUsers(data);
	};
	const allUsers = users.filter((user) => user.userId !== userId);
	useEffect(() => {
		fetchPeople();
	}, []);
	return (
		<div className="hidden xl:block">
			<div className="bg-primary-200 p-4 rounded-lg w-[350px] flex flex-col gap-4 sticky top-[100px]">
				<div className="flex flex-col gap-2">
					<h1 className="text-lg text-light font-semibold">Birthdays</h1>
					<div className="flex gap-2 items-center">
						<Avatar src={image} className="cursor-pointer"></Avatar>
						<div className="text-light text-sm">
							<span className="font-semibold cursor-pointer">Musk </span>and 7
							others have birthdays today
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<h1 className="text-lg text-light font-semibold">Active</h1>
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
				<Button
					sx={{
						backgroundColor: "#010a13",
						p: 1.5,
						"&:hover": { backgroundColor: "#010a13" },
						textTransform: "capitalize",
						fontWeight: "bold",
						borderRadius: "7px",
					}}
					className=" text-primary-100 ">
					See more
				</Button>
			</div>
		</div>
	);
};

export default SideRight;
