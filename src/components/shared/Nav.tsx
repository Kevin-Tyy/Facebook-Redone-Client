import {
	FlagRounded,
	GroupRounded,
	HomeRounded,
	PeopleRounded,
	Shop2Rounded,
	SportsEsportsRounded,
	LiveTvRounded,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
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
const BottomNav = () => {
	const [activeTab, setActiveTab] = useState('Home')

	return (
		<div className="xl:hidden fixed bottom-0 w-full p-2 z-[999]">
			<div className=" bg-gray-950 w-full z-[999] text-light flex gap-1 p-2 rounded-md border border-gray-700 shadow-2xl shadow-primary-100">
				{UtilObj.map((obj) => (
					<Link to={obj.link} onClick={()=>setActiveTab(obj.title)} className={`w-full cursor-pointer hover:bg-gray-800 p-2  rounded-md flex justify-center ${activeTab === obj.title && 'bg-gray-800 '}`}>
						<Tooltip title={obj.title}>
							<div >
								{obj.icon}
							</div>
						</Tooltip>
					</Link>
				))}
			</div>
		</div>
	);
};

export default BottomNav;
