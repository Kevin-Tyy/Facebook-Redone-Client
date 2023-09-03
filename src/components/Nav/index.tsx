import Logo from "../Logo";
import {
	Search,
	LogoutRounded,
	Settings,
	ArrowDropDown,
	WbSunnyOutlined,
	CloseRounded,
} from "@mui/icons-material";
import { HiUsers, HiUser, HiMoon } from "react-icons/hi2";
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
import { currentTheme, toggleTheme } from "../../redux/features/ThemeSlice";
import MobileSidebar from "./MobileSidebar";
import { BiMenu } from "react-icons/bi";
const Navbar = () => {
	const [toggleNotifications, setToggleNotifications] = useState(false);
	const [notifications, setNotifications] = useState<Notification[] | null>(
		null
	);
	const [searchKey, setSearchKey] = useState<string | null>(null);
	const [searchPopupOpen, setSearchPopupOpen] = useState<boolean>(false);
	const [mobileSearch, setMobileSearch] = useState<boolean>(false);
	const [mobileSidebar, setMobileSidebar] = useState<boolean>(false);
	const [mobileSearchPopup, setMobileSearchPopup] = useState<boolean>(false);
	const [isSearch, setSearch] = useState(false);
	const dispatch = useDispatch();
	const { theme } = useSelector(currentTheme);
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
			icon: <BsFillBellFill size={20}/>,
			title: "Notifications",
			onClick: function () {
				setToggleNotifications(true);
			},
		},
		{
			icon: <Settings />,
			title: "Settings and Privacy",
			Link: `/profile/${userId}`,
		},
		{
			icon: theme === "dark" ? <WbSunnyOutlined /> : <HiMoon size={20} />,
			title: theme === "dark" ? "Switch to light" : "Switch to dark",
			onClick: function () {
				dispatch(toggleTheme(theme === "dark" ? "light" : "dark"));
			},
			link: "#",
		},
		{
			icon: <LogoutRounded />,
			title: "Logout",
			onClick: function () {
				dispatch(logout());
				localStorage.clear();
			},
		},
	];

	useEffect(() => {
		axios.get(`${BaseURL}/notifications/${userId}`).then((response) => {
			setNotifications(response.data.notifications);
		});
	}, []);
	const mobileSearchRef = useRef<HTMLDivElement>(null);
	const searchRef = useRef<HTMLDivElement | null>(null);
	const handleSearchRefOutsideClick = (e: any) => {
		if (searchRef.current && !searchRef.current.contains(e.target)) {
			setSearch(false);
			setSearchPopupOpen(false);
		}
	};
	const handleMobileSearchOutsideClick = (e: any) => {
		if (
			mobileSearchRef.current &&
			!mobileSearchRef.current.contains(e.target)
		) {
			setMobileSearch(false);
			setMobileSearchPopup(false);
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleSearchRefOutsideClick);
		return () => {
			document.addEventListener("mousedown", handleSearchRefOutsideClick);
		};
	}, []);
	useEffect(() => {
		document.addEventListener("mousedown", handleMobileSearchOutsideClick);
		return () => {
			document.addEventListener("mousedown", handleMobileSearchOutsideClick);
		};
	}, []);
	return (
		<section className="sticky top-0 z-[5]">
			<main className="flex flex-col relative gap-5 bg-slate-200 shadow dark:bg-primary-200 border-b dark:border-gray-800">
				<section className="relative flex items-center justify-between sm:hidden px-2 pt-4">
					<h1
						className={`${
							mobileSearch && "opacity-0"
						} text-blue-500 font-black text-3xl select-none transition duration-500 font-sans`}>
						facebook
					</h1>
					<div
						ref={mobileSearchRef}
						className={`${
							mobileSearch && "bg-white dark:bg-primary-100 "
						} absolute right-14 duration-500 flex items-center gap-3 p-1 focus-within:ring-1 focus-within:ring-slate-400/30 dark:focus-within:ring-gray-600 focus-within:ring-inset overflow-hidden rounded-full w-12 xl:w-[300px] transition-all pl-4 ${
							mobileSearch && "max-w-full w-[80%]"
						}`}>
						<Search
							sx={{
								color: theme === "dark" ? "#e5e5e5" : "#475569",
								cursor: "pointer",
							}}
							onClick={() => setMobileSearch(true)}
						/>
						<input
							type="text"
							className="w-full bg-transparent outline-none text-slate-700 dark:text-white"
							placeholder="Search facebook"
							onChange={(e) => {
								setSearchKey(e.target.value);
								setMobileSearchPopup(true);
							}}
						/>
						{mobileSearchPopup && searchKey && (
							<SearchPopup
								searchKey={searchKey}
								onClose={() => setMobileSearchPopup(false)}
							/>
						)}
						<CloseRounded
							sx={{ fontSize: 35 }}
							className="text-slate-600 cursor-pointer dark:text-white bg-slate-200 dark:bg-gray-500 p-2 rounded-full"
							onClick={() => setMobileSearch(false)}
						/>
					</div>
					<BiMenu
						size={30}
						onClick={() => setMobileSidebar(true)}
						className="text-slate-500 dark:text-white cursor-pointer"
					/>
				</section>
				<section className="relative flex xl:gap-[15%] justify-between items-center ">
					<header
						ref={searchRef}
						className={`${
							isSearch && "min-w-[50vw] "
						}  p-1 sm:p-3 relative sm:w-full max-w-[700px] hidden sm:flex items-center`}>
						<Logo />
						<div
							className={`bg-transparent xl:bg-white xl:dark:bg-primary-100 absolute duration-500 left-[65px] xl:left-20 hidden sm:flex items-center gap-3 p-3.5 focus-within:ring-1 focus-within:ring-slate-400/30 dark:focus-within:ring-gray-600 focus-within:ring-inset rounded-full w-14 xl:w-[300px] transition-all pl-4 ${
								isSearch && "max-w-full w-full bg-white dark:bg-primary-100 "
							}`}>
							<Search
								sx={{
									color: theme === "dark" ? "#fff" : "#334155",
									cursor: "pointer",
								}}
								onClick={() => setSearch(true)}
							/>
							<input
								type="text"
								className="w-full bg-transparent outline-none text-slate-700 dark:text-white"
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
							isSearch && "absolute -z-10 opacity-0"
						} w-full flex sm:gap-2 self-end  justify-center transition-all duration-500`}>
						{navLinkIcons.map((item, index) => (
							<Tooltip title={item.title} key={index}>
								<NavLink
									to={item.link}
									className={` w-full  cursor-pointer transition hover:text-blue-600  max-w-[100px]`}>
									<div className="w-full group flex flex-col items-center justify-center text-slate-600 dark:text-white">
										<div className="px-3 sm:px-10 pb-4">{<item.icon size={22} />}</div>
										<div className="bottomBorder h-1.5 rounded-t-md bg-blue-600 w-0 group-hover:w-3/5 transition-all duration-500"></div>
									</div>
								</NavLink>
							</Tooltip>
						))}
					</nav>
					<div className="pl-4 pr-2 sm:p-0 sm:w-full min-w-fit justify-end flex gap-2 xl:gap-10 items-center">
						<div
							className="hidden xl:block cursor-pointer  text-slate-600 dark:text-white relative p-2 rounded-md"
							onClick={() => setToggleNotifications(true)}>
							<BsFillBellFill size={22} />
							{notifications?.length !== 0 &&
								!notifications?.every((notification) =>
									notification.Seen.some((user) => user.userId === userId)
								) && (
									<div className="w-3 h-3 bg-red-600 absolute top-1 right-1 rounded-full"></div>
								)}
						</div>
						<section className=" bg-white hidden sm:block dark:bg-primary-100/60 rounded-full mx-1 sm:py-1.5  sm:px-2 cursor-pointer  hover:bg-slate-100 dark:hover:bg-primary-100 transition group">
							<div className="flex items-center gap-2">
								<img
									src={profileimage || placeholderImage}
									alt="profile"
									className="w-8 h-8 sm:w-10 sm:h-10  rounded-full object-cover"
								/>
								<div className="hidden lg:flex items-center">
									<p className="capitalize  text-slate-500 dark:text-white ">
										{username}
									</p>
									<div className="group-hover:rotate-180 transition-all duration-500">
										<ArrowDropDown
											sx={{
												fontSize: 30,
												color: theme === "dark" ? "#fff" : "#334155",
											}}
										/>
									</div>
								</div>
							</div>
							<nav className="absolute invisible group-hover:visible -translate-y-3 group-hover:translate-y-0 ring-1 ring-slate-300  opacity-0 group-hover:opacity-100 overflow-hidden duration-300 transition-all mt-6 right-0 bg-slate-200 dark:bg-primary-200 m-2 ring-inset dark:ring-gray-700 rounded-3xl w-full max-w-xs">
								<Link to={`/profile/${userId}`}>
									<div className="flex items-center gap-3  p-4  m-1 cursor-pointer rounded-lg">
										<img
											src={profileimage || placeholderImage}
											className="rounded-full w-12 h-12 object-cover"
										/>
										<div>
											<p className=" text-slate-700 dark:text-white capitalize">
												{username}
											</p>
											<p className="text-gray-400">{email}</p>
										</div>
									</div>
								</Link>
								<ul className="flex flex-col space-y-1 ">
									{toggleObj.map((obj, index) => (
										<Link to={obj?.link as string} key={index}>
											<div
												className="py-3 px-5  hover:bg-slate-100 dark:hover:bg-primary-100/40 rounded-md m-1 cursor-pointer"
												key={index}
												onClick={obj?.onClick}>
												<li className="flex  text-slate-700 dark:text-white gap-3">
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
				<div
					className={`absolute w-full h-screen left-0 bottom-0 right-0 top-0 bg-primary-200/70  transition-all overflow-hidden ${
						mobileSidebar ? "visible" : "invisible"
					}`}>
					<div
						className={`fixed top-0 right-0 h-screen sm:hidden max-w-sm overflow-hidden transition-all duration-700 ${
							mobileSidebar ? "w-full" : "w-0"
						}`}>
						<MobileSidebar onClose={() => setMobileSidebar(false)} />
					</div>
				</div>
			</main>
		</section>
	);
};

export default Navbar;
