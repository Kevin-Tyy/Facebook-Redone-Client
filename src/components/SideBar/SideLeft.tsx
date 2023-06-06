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

import { Avatar, Button } from "@mui/material";

const UtilObj = [
	{ icon: <HomeRounded sx={{ fontSize: 25 }} />, title: "Home" },
	{ icon: <PeopleRounded sx={{ fontSize: 25 }} />, title: "Friends" },
	{ icon: <GroupRounded sx={{ fontSize: 25 }} />, title: "Groups" },
	{ icon: <LiveTvRounded sx={{ fontSize: 25 }} />, title: "Watch" },
	{ icon: <FlagRounded sx={{ fontSize: 25 }} />, title: "Pages" },
	{ icon: <Shop2Rounded sx={{ fontSize: 25 }} />, title: "Market" },
	{ icon: <SportsEsportsRounded sx={{ fontSize: 25 }} />, title: "Gaming" },
];

const Sidebar = () => {
	return (
		<div>
			<div className="bg-primary-200 py-4 px-2 w-[400px] flex flex-col rounded-lg gap-4 sticky top-[105px]">
				<div className="flex items-center gap-3 border-b-[3px] border-primary-100 p-5">
					<Avatar>J</Avatar>
					<p className="text-white">John Doe</p>
				</div>
				<div className="flex flex-col gap-4">
					{UtilObj.map((obj, index) => (
						<div
							className="flex items-center gap-4 p-3 pl-6 cursor-pointer transition duration-200 rounded-xl  w-full hover:bg-gray-950"
							key={index}>
							<span className="text-white">{obj.icon}</span>
							<p className="text-white">{obj.title}</p>
						</div>
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
