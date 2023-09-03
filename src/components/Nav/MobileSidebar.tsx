import {
	CloseRounded,
	LogoutRounded,
	Settings,
	WbSunnyOutlined,
} from "@mui/icons-material";
import { HiMoon } from "react-icons/hi";
import { HiUser, HiUsers } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { currentTheme, toggleTheme } from "../../redux/features/ThemeSlice";
import { loggedInUser, logout } from "../../redux/features/AuthSlice";
import { UserInfo } from "../../types/types";
import placeholderImage from "../../assets/avatar.webp";
import { useEffect, useRef } from "react";
import { BsFillBellFill } from "react-icons/bs";
interface Props {
	onClose: () => void;
	setToggleNotifications : () => void;
}
const MobileSidebar: React.FC<Props> = ({ onClose, setToggleNotifications }) => {
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
			icon: <BsFillBellFill size={20} />,
			title: "Notifications",
			onClick: function () {
				onClose()
				setToggleNotifications();
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
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const handleSidebarOutsideClick = (e: any) => {
		if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleSidebarOutsideClick);
		return () => {
			document.addEventListener("mousedown", handleSidebarOutsideClick);
		};
	}, []);
	return (
		<nav
			ref={sidebarRef}
			className="h-full relative w-auto ring-1 ring-slate-400 duration-300 transition-all bg-slate-200 dark:bg-primary-200 ring-inset dark:ring-gray-700 rounded-l-3xl pt-10">
			<CloseRounded
				sx={{ fontSize: 33 }}
				onClick={onClose}
				className="absolute text-slate-600 dark:text-white top-0 right-0 p-2 bg-slate-300 dark:bg-primary-100 my-4 mx-3 rounded-md cursor-pointer"
			/>
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
							className="py-3 px-5  hover:bg-slate-100 dark:hover:bg-primary-100/40 rounded-md m-1 cursor-pointer "
							key={index}
							onClick={obj?.onClick}>
							<li className="flex whitespace-nowrap text-slate-700 dark:text-white gap-3">
								<span>{obj.icon}</span>
								<span>{obj.title}</span>
							</li>
						</div>
					</Link>
				))}
			</ul>
		</nav>
	);
};

export default MobileSidebar;
