import {
	FlagRounded,
	GroupRounded,
	HomeRounded,
	PeopleRounded,
	Shop2Rounded,
	SportsEsportsRounded,
	LiveTvRounded,
} from "@mui/icons-material";
// import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useState} from 'react'
import { loggedInUser } from "../../redux/features/AuthSlice";
import { Link } from "react-router-dom";
import { UserInfo } from "../../types/Types";
const UtilObj = [
	{ icon: <HomeRounded sx={{ fontSize: 25 }} />, title: "Home", link: "/home" },
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
		link: "/home",
	},
	{
		icon: <FlagRounded sx={{ fontSize: 25 }} />,
		title: "Pages",
		link: "/home",
	},
	{
		icon: <Shop2Rounded sx={{ fontSize: 25 }} />,
		title: "Market",
		link: "/home",
	},
	{
		icon: <SportsEsportsRounded sx={{ fontSize: 25 }} />,
		title: "Gaming",
		link: "/home",
	},
];

const Sidebar = () => {
	const [activeTab, setActiveTab] = useState('Home')
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
		<div>
			<div className="bg-primary-200 hidden py-4 px-2  w-[350px]  xl:flex flex-col rounded-lg gap-4 sticky top-[100px]">
				<Link to={`/profile/${userId}`}>
					<div className="flex items-center gap-3   p-3 pb-4 hover:bg-gray-800/50  cursor-pointer rounded-lg">
						<div className="bg-gradient-to-r from-violet-800 to-sky-500 rounded-full p-[3px]">
							<div className="bg-primary-200 p-[4px] rounded-full">
								<img
									src={profileimage}
									className="rounded-full w-12 h-12 object-cover"
								/>
							</div>
						</div>
						<div>
							<p className="text-white capitalize">{username}</p>
							<p className="text-gray-400">{email}</p>
						</div>
					</div>
				</Link>
				<div className="border-b-[3px] border-primary-100"></div>
				<div className="flex flex-col gap-4">
					{UtilObj.map((obj, index) => (
						<Link to={obj?.link}>
							<div	
								onClick={() => setActiveTab(obj.title)}
								className={`flex items-center gap-4 p-3 pl-6 cursor-pointer transition duration-200 rounded-md  w-full hover:bg-gray-800/50 ${activeTab === obj.title && 'bg-gray-800 '}`}
								key={index}>
								<span className="text-white">{obj.icon}</span>
								<p className="text-white">{obj.title}</p>
							</div>
						</Link>
					))}
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

export default Sidebar;
