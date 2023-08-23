import Logo from "../Logo";
import {
	Search,
	PersonRounded,
	PeopleAltRounded,
	LogoutRounded,
	Settings,
	ArrowDropDown,
	NotificationAddSharp,
	WbSunnyOutlined,
} from "@mui/icons-material";

import { useSelector } from "react-redux";
import { loggedInUser, logout } from "../../redux/features/AuthSlice";
import placeholderImage from "../../assets/avatar.webp";
import { UserInfo } from "../../types/Types";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Tooltip } from "@mui/material";
import { navObj as navLinkIcons } from "../../utils/utilObjects";

const Navbar = () => {
	const dispatch = useDispatch();
	const {
		user: {
			userInfo: { profileimage, userId, username, email },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const toggleObj = [
		{
			icon: <PersonRounded />,
			title: "Your Profile",
			link: `/profile/${userId}`,
		},
		{
			icon: <PeopleAltRounded />,
			title: "Your friends",
			link: `/friends`,
		},
		{
			icon: <Settings />,
			title: "Settings and Privacy",
			Link: `/profile/${userId}`,
		},
		{
			icon: <WbSunnyOutlined />,
			title: "Change Modes",
			link: "#",
		},
		{ icon: <LogoutRounded />, title: "Logout" },
	];
	const handleClick = (index: number) => {
		if (index === 4) {
			dispatch(logout());
		}
	};

	return (
		<div className="sticky top-0 z-[5]">
			<div className="flex gap-4 justify-between items-center bg-primary-200 border-b border-gray-800">
				<div className="w-full hidden md:flex gap-4 items-center p-3">
					<Logo />
					<div className="bg-primary-100/60 flex items-center gap-3 p-3.5 focus-within:ring-1 focus-within:ring-gray-600 transition focus-within:ring-inset rounded-full w-[300px] pl-4">
						<Search sx={{ color: "#fff" }} />
						<input
							type="text"
							className="w-full bg-transparent outline-none text-white"
							placeholder="Search facebook"
						/>
					</div>
				</div>
				<div className="w-full flex gap-2 self-end justify-center">
					{navLinkIcons.map((item, index) => (
						<Tooltip title={item.title} key={index}>
							<NavLink
								to={item.link}
								className={` w-full cursor-pointer transition hover:text-blue-600 max-w-[100px]`}>
								<div className="w-full group flex flex-col items-center justify-center text-white">
									<div className="p-3">
										{<item.icon sx={{ fontSize: 25 }} />}
									</div>
									<div className="bottomBorder h-1.5 rounded-t-md bg-blue-600 w-0 group-hover:w-3/5 transition-all duration-500"></div>
								</div>
							</NavLink>
						</Tooltip>
					))}
				</div>
				<div className="w-full justify-end flex gap-10 items-center">
					<NotificationAddSharp
						sx={{ color: "white", fontSize: 25, cursor: "pointer" }}
					/>
					<div className="bg-primary-100/60 rounded-full py-1.5 px-2 cursor-pointer hover:bg-primary-100 transition group">
						<div className="flex items-center gap-2">
							<img
								src={profileimage || placeholderImage}
								alt="profile"
								className="w-10 h-10  rounded-full object-cover"
							/>
							<div className="flex items-center">
								<p className="capitalize text-white font-bold">{username}</p>
								<div className="group-hover:rotate-180 transition-all duration-500">
									<ArrowDropDown sx={{ fontSize: 30, color: "white" }} />
								</div>
							</div>
						</div>
						<div className="absolute invisible group-hover:visible -translate-y-3 group-hover:translate-y-0  opacity-0 group-hover:opacity-100 overflow-hidden duration-300 transition-all mt-6 right-0 bg-primary-200 m-2 ring-1 ring-inset ring-gray-700 rounded-3xl w-full max-w-xs">
							<Link to={`/profile/${userId}`}>
								<div className="flex items-center gap-3  p-4  m-1 cursor-pointer rounded-lg">
									<img
										src={profileimage || placeholderImage}
										className="rounded-full w-12 h-12 object-cover"
									/>
									<div>
										<p className="text-white capitalize">{username}</p>
										<p className="text-gray-400">{email}</p>
									</div>
								</div>
							</Link>
							<ul className="flex flex-col space-y-1">
								{toggleObj.map((obj, index) => (
									<Link to={obj?.link as string} key={index}>
										<div
											className="py-3 px-5 hover:bg-primary-100/40 rounded-md m-1 cursor-pointer"
											key={index}
											onClick={() => handleClick(index)}>
											<li className="flex text-white gap-3">
												<span>{obj.icon}</span>
												<span>{obj.title}</span>
											</li>
										</div>
									</Link>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
