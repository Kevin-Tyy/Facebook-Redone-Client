import Logo from "../Logo";
import {
	Search,
	LogoutRounded,
	Settings,
	ArrowDropDown,
	WbSunnyOutlined,
} from "@mui/icons-material";
import { HiUsers, HiUser } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { loggedInUser, logout } from "../../redux/features/AuthSlice";
import placeholderImage from "../../assets/avatar.webp";
import { Notification, UserInfo } from "../../types/types";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Tooltip } from "@mui/material";
import { navObj as navLinkIcons } from "../../utils/utilObjects";
import { BsFillBellFill } from "react-icons/bs";
import NotificationPopup from "./NotificationPopup";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import SearchPopup from "./SearchPopup";
const Navbar = () => {
	const [toggleNotifications, setToggleNotifications] = useState(false);
	const [notifications, setNotifications] = useState<Notification[] | null>(
		null
	);
	const [searchKey, setSearchKey] = useState<string | null>(null);
	const [searchPopupOpen, setSearchPopupOpen] = useState<boolean>(false);
	const [isSearch, setSearch] = useState(false);
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
			icon: <HiUser size={20} />,
			title: "Your Profile",
			link: `/profile/${userId}`,
		},
		{
			icon: <HiUsers size={20} />,
			title: "Your friends",
			link: `/i/friends`,
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
	useEffect(() => {
		axios.get(`${BaseURL}/notifications/${userId}`).then((response) => {
			setNotifications(response.data.notifications);
		});
	}, []);
	const searchRef = useRef<HTMLDivElement | null>(null);
	const handleSearchRefOutsideClick = (e: any) => {
		if (searchRef.current && !searchRef.current.contains(e.target)) {
			setSearch(false);
			setSearchPopupOpen(false)
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleSearchRefOutsideClick);
		return () =>
			document.addEventListener("mousedown", handleSearchRefOutsideClick);
	}, []);
	return (
		<section className="sticky top-0 z-[5]">
			<section className="relative flex xl:gap-[15%] justify-between items-center bg-primary-200 border-b border-gray-800">
				<header
					ref={searchRef}
					className={`${
						isSearch && "w-full "
					} flex gap-4 items-center p-3 relative w-full max-w-[700px] `}>
					<Logo />
					<div
						className={`bg-primary-100 absolute duration-500 left-20 flex items-center gap-3 p-3.5 focus-within:ring-1 focus-within:ring-gray-600 focus-within:ring-inset rounded-full w-14 xl:w-[300px] transition-all pl-4 ${
							isSearch && "max-w-full w-full"
						}`}>
						<Search
							sx={{ color: "#fff", cursor: "pointer" }}
							onClick={() => setSearch(true)}
						/>
						<input
							type="text"
							className="w-full bg-transparent outline-none text-white"
							placeholder="Search facebook"
							onChange={(e) => {
								setSearchKey(e.target.value);
								setSearchPopupOpen(true);
							}}
						/>
					</div>
					{searchPopupOpen && searchKey && (
						<SearchPopup
							searchKey={searchKey}
							onClose={() => setSearchPopupOpen(false)}
						/>
					)}
				</header>
				<nav
					className={`${
						isSearch && "invisible opacity-0"
					} w-full flex gap-2 self-end  justify-center transition-all duration-500`}>
					{navLinkIcons.map((item, index) => (
						<Tooltip title={item.title} key={index}>
							<NavLink
								to={item.link}
								className={` w-full  cursor-pointer transition hover:text-blue-600  max-w-[100px]`}>
								<div className="w-full group flex flex-col items-center justify-center text-white">
									<div className="p-3">{<item.icon size={22} />}</div>
									<div className="bottomBorder h-1.5 rounded-t-md bg-blue-600 w-0 group-hover:w-3/5 transition-all duration-500"></div>
								</div>
							</NavLink>
						</Tooltip>
					))}
				</nav>
				<div className="w-full min-w-fit justify-end flex gap-2 xl:gap-10 items-center">
					<div
						className="hidden md:block cursor-pointer text-white relative p-2 rounded-md"
						onClick={() => setToggleNotifications(true)}>
						<BsFillBellFill size={22} />
						{notifications?.length !== 0 && (
							<div className="w-3 h-3 bg-red-600 absolute top-1 right-1 rounded-full"></div>
						)}
					</div>
					<section className="bg-primary-100/60 rounded-full mx-1 sm:py-1.5  sm:px-2 cursor-pointer hover:bg-primary-100 transition group">
						<div className="flex items-center gap-2">
							<img
								src={profileimage || placeholderImage}
								alt="profile"
								className="w-10 h-10  rounded-full object-cover"
							/>
							<div className="hidden sm:flex items-center">
								<p className="capitalize text-white font-bold">{username}</p>
								<div className="group-hover:rotate-180 transition-all duration-500">
									<ArrowDropDown sx={{ fontSize: 30, color: "white" }} />
								</div>
							</div>
						</div>
						<nav className="absolute invisible group-hover:visible -translate-y-3 group-hover:translate-y-0  opacity-0 group-hover:opacity-100 overflow-hidden duration-300 transition-all mt-6 right-0 bg-primary-200 m-2 ring-1 ring-inset ring-gray-700 rounded-3xl w-full max-w-xs">
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
						</nav>
					</section>
				</div>
				{toggleNotifications && (
					<NotificationPopup onClose={() => setToggleNotifications(false)} />
				)}
			</section>
		</section>
	);
};

export default Navbar;
