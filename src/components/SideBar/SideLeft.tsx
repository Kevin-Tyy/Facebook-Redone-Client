import {
	GroupRounded,
	HomeRounded,
	PeopleRounded,
	SportsEsportsRounded,
	LiveTvRounded,
} from "@mui/icons-material";
import Policy from "../shared/Policy";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { Link } from "react-router-dom";
import { UserInfo } from "../../types/Types";
import { NavLink } from "react-router-dom";
const UtilObj = [
	{ icon: <HomeRounded sx={{ fontSize: 25 }} />, title: "Home", link: "/" },
	{
		icon: <PeopleRounded sx={{ fontSize: 25 }} />,
		title: "Friends",
		link: "/friends",
	},
	{
		icon: <GroupRounded sx={{ fontSize: 25 }} />,
		title: "Groups",
		link: "/friends",
	},
	{
		icon: <LiveTvRounded sx={{ fontSize: 25 }} />,
		title: "Watch",
		link: "/",
	},
	{
		icon: <SportsEsportsRounded sx={{ fontSize: 25 }} />,
		title: "Gaming",
		link: "/",
	},
];

const Sidebar = () => {
	const [activeTab, setActiveTab] = useState("Home");
	const {
		user: {
			userInfo: { profileimage, username, email, userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	return (
		<div className="h-fit hidden xl:flex flex-col space-y-6 sticky top-[90px]  w-[370px]">
			<div className="bg-primary-200 p-8 rounded-md">
				<Link to={`/profile/${userId}`}>
					<div className="flex items-center gap-3 rounded-lg">
						<div className="bg-gradient-to-r from-violet-800 to-sky-500 rounded-full p-[2px] ">
							<img
								src={profileimage}
								className="rounded-full w-12 h-12 object-cover"
							/>
						</div>
						<div>
							<p className="text-white capitalize">{username}</p>
							<p className="text-gray-400">{email}</p>
						</div>
					</div>
				</Link>
			</div>
			<div className="bg-primary-200 py-3 px-2 flex flex-col rounded-lg gap-4">
				<div className="flex flex-col gap-4">
					{UtilObj.map((obj, index) => (
						<NavLink to={obj?.link} key={index}>
							<div
								onClick={() => setActiveTab(obj.title)}
								className={`flex items-center gap-4 p-3 pl-6 cursor-pointer transition duration-200 rounded-md  w-full hover:bg-primary-100 ${
									activeTab === obj.title && "bg-primary-100/50"
								}`}>
								<span className="text-white">{obj.icon}</span>
								<p className="text-white">{obj.title}</p>
							</div>
						</NavLink>
					))}
				</div>
				<Button
					sx={{
						color: "white",
						backgroundColor: "#0C88EF",
						textTransform: "capitalize",
						borderRadius: "40px",
						m: "10px",
						px: "25px",
						py: "12px",
						"&:hover": { backgroundColor: "#3293e3" },
					}}>
					See more
				</Button>
			</div>
			<Policy />
		</div>
	);
};

export default Sidebar;
