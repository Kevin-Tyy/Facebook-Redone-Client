import Logo from "../Logo";
import {
	Telegram,
	MoreVert,
	Notifications,
	Search,
	PersonRounded,
	PeopleAltRounded,
	LogoutRounded,
	Settings,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { loggedInUser, logout } from "../../redux/features/AuthSlice";
import { UserInfo } from "../../types/Types";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
const navObj = [
	{ icon: <MoreVert sx={{ fontSize: 20 }} /> },
	{ icon: <Telegram sx={{ fontSize: 20 }} /> },
	{ icon: <Notifications sx={{ fontSize: 20 }} /> },
];

const Navbar = () => {
	const [showToggle, setShowToggle] = useState(false);
	const toggleRef = useRef<HTMLDivElement | null>(null);
	const dispatch = useDispatch();
	const [isNotication, setNotification] = useState(false);
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
			link: `/profile/${userId}`,
		},
		{
			icon: <Settings />,
			title: "Settings and Privacy",
			Link: `/profile/${userId}`,
		},
		{ icon: <LogoutRounded />, title: "Logout" },
	];
	const handleOutsideClick = (e: any) => {
		if (toggleRef.current && !toggleRef.current.contains(e.target)) {
			setShowToggle(false);
			handleLogout;
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.addEventListener("mousedown", handleOutsideClick);
		};
	}, []);
	const handleLogout = () => {
		dispatch(logout());
	};
	const handleClick = (index: number) => {
		if (index === 3) {
			handleLogout();
		}
	};
	const handleNavButtons = (index: number) => {
		if (index === 0) {
			setShowToggle(true);
		}
		if (index === 2) {
			setNotification(!isNotication);
			if (!isNotication) {
				toast.success(
					"You will be receiving notifications when your friends make posts"
				);
			}
		}
	};
	return (
		<div className="sticky top-0 z-[5]">
			<div className="flex gap-4 justify-between bg-primary-200 p-4 border-b border-gray-800">
				<div className="hidden md:block">
					<Logo />
				</div>
				<div className="bg-gray-950 flex items-center gap-3 p-1 rounded-full w-[500px] pl-4">
					<Search sx={{ color: "#fff" }} />
					<input
						type="text"
						className="w-full bg-transparent outline-none text-white"
						placeholder="Search facebook"
					/>
				</div>
				<div className="flex gap-2 md:gap-4 items-center">
					{navObj.map((nav, index) => (
						<div
							key={index}
							onClick={() => handleNavButtons(index)}
							className={`bg-gray-950 w-10 h-10 flex items-center justify-center rounded-full text-primary-100 
								cursor-pointer hover:bg-gray-900 transition duration-300 border border-gray-700 active:bg-gray-800 hover:rotate-[360deg] ${
									index == 2 &&
									isNotication &&
									"bg-primary-100/20 active:scale-125 hover:bg-primary-100/20 "
								}`}>
							{nav.icon}
						</div>
					))}
					<div
						onClick={() => setShowToggle(true)}
						className="bg-gradient-to-r h-10 w-10 from-sky-500 to-violet-800 rounded-full cursor-pointer p-[3px]">
						<img
							src={profileimage}
							alt="profile"
							className="w-full h-full  rounded-full object-cover"
						/>
					</div>
				</div>
			</div>
			{showToggle && (
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.1 }}
					transition={{ duration: 0.15 }}
					variants={{
						hidden: { opacity: 0, y: -30 },
						visible: { opacity: 1, y: 0 },
					}}
					className="absolute right-0 bg-primary-200 m-2 border border-gray-700 rounded-md"
					ref={toggleRef}>
					<Link to={`/profile/${userId}`}>
						<div className="flex items-center gap-3  p-3 pb-4 hover:bg-gray-800/50 m-1 cursor-pointer rounded-lg">
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
					<ul>
						{toggleObj.map((obj, index) => (
							<div
								className="py-4 px-8 hover:bg-primary-300/40 border-b border-gray-700 rounded-md m-1 cursor-pointer transition"
								key={index}
								onClick={() => handleClick(index)}>
								<Link to={obj?.link as string}>
									<li className="flex text-white gap-3">
										<span>{obj.icon}</span>
										<span>{obj.title}</span>
									</li>
								</Link>
							</div>
						))}
					</ul>
				</motion.div>
			)}
		</div>
	);
};

export default Navbar;
