import Logo from "../Logo";
import { Telegram, MoreVert, Notifications, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";

const navObj = [
	{ icon: <MoreVert sx={{ fontSize: 20 }} /> },
	{ icon: <Telegram sx={{ fontSize: 20 }} /> },
	{ icon: <Notifications sx={{ fontSize: 20 }} /> },
];

const Navbar = () => {
	const {
		user: {
			userInfo: { profileimage },
		},
	} = useSelector(loggedInUser);
	return (
		<div className="sticky top-0 z-[5]">
			<div className="flex justify-between bg-primary-200 p-4 border-b border-gray-800">
				<Logo />
				<div className="bg-gray-950 flex items-center gap-3 p-1 rounded-full w-[500px] pl-4">
					<Search sx={{ color: "#fff" }} />
					<input
						type="text"
						className="w-full bg-transparent outline-none text-white"
						placeholder="Search facebook"
					/>
				</div>
				<div className="flex gap-4 items-center">
					{navObj.map((nav, index) => (
						<div
							key={index}
							className="bg-gray-950 w-10 h-10 flex items-center justify-center rounded-full text-primary-100 cursor-pointer hover:bg-gray-900 transition duration-300 border border-gray-700 active:bg-gray-800">
							{nav.icon}
						</div>
					))}
					<div className="bg-gradient-to-r h-10 w-10 from-sky-500 to-violet-800 rounded-full p-[3px]">
						<img
							src={profileimage}
							alt="profile"
							className="w-full h-full  rounded-full object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
