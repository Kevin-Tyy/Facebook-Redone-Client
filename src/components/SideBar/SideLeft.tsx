import Policy from "../shared/Policy";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { GroupType, UserInfo } from "../../types/Types";
import placeholderAvatar from "../../assets/avatar.webp";

import { NavLink } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import { HiMiniHome, HiUserGroup, HiUsers } from "react-icons/hi2";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { BsFillBookmarkFill } from "react-icons/bs";
const UtilObj = [
	{ icon: <HiMiniHome size={20} />, title: "Home", link: "/i/flow" },
	{
		icon: <HiUsers size={20} />,
		title: "Friends",
		link: "/i/friends",
	},
	{
		icon: <HiUserGroup size={20} />,
		title: "Groups",
		link: "/i/groups",
	},
	{
		icon: <BiSolidMessageRoundedDots size={20} />,
		title: "Messages",
		link: "/chat",
	},
	{
		icon: <BsFillBookmarkFill size={15} />,
		title: "Saved",
		link: "/i/saved",
	},
];
const Sidebar = () => {
	const [groups, setGroups] = useState<GroupType[] | null>(null);
	const navigate = useNavigate();

	const {
		user: {
			userInfo: { profileimage, username, email, userId, firstname, lastname },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const fetchGroups = () => {
		axios.get(`${BaseURL}/groups`).then((response) => {
			setGroups(response.data);
		});
	};
	useEffect(() => {
		fetchGroups();
	}, []);
	return (
		<section className="h-fit hidden xl:flex flex-col space-y-6 sticky top-[90px]  w-full max-w-[370px]">
			<header className="bg-primary-200 p-4 rounded-md ring-1 ring-gray-700/60">
				<Link to={`/profile/${userId}`}>
					<div className="flex items-center gap-3 rounded-lg">
						<div className="bg-primary-100 rounded-full p-[3px] ">
							<img
								src={profileimage || placeholderAvatar}
								className="rounded-full w-12 h-12 object-cover"
							/>
						</div>
						<div>
							<p className="text-white capitalize">
								{firstname} {lastname}
							</p>
							<div className="flex items-center space-x-2 text-gray-400">
								<p className="text-sm capitalize">@{username}</p>
								<span>•</span>
								<p className="text-sm">{email}</p>
							</div>
						</div>
					</div>
				</Link>
			</header>
			<section className="bg-primary-200 py-3 px-2 flex flex-col rounded-lg gap-4">
				<nav className="flex flex-col gap-4">
					{UtilObj.map((obj, index) => (
						<NavLink
							to={obj?.link}
							key={index}
							className={({ isActive}) =>
								`flex items-center gap-4 p-3 pl-6 cursor-pointer transition duration-200 rounded-md  w-full hover:bg-primary-100 ${isActive && 'bg-primary-100/50'}`
							}>
							<span className="text-white">{obj.icon}</span>
							<p className="text-white">{obj.title}</p>
						</NavLink>
					))}
				</nav>
				<Button
					sx={{
						color: "white",
						backgroundColor: "#0C88EF",
						textTransform: "capitalize",
						borderRadius: "40px",
						width: "fit-content",
						m: "10px",
						px: "25px",
						py: "12px",
						"&:hover": { backgroundColor: "#3293e3" },
					}}>
					See more
				</Button>
			</section>
			<section className="bg-primary-200 group p-3 rounded-xl">
				<div className="mb-4 group w-fit cursor-default ml-3">
					<h1 className="text-white text-lg mb-1">Explore</h1>
					<div className="w-10 h-1 bg-blue-base rounded-full mt-1 group-hover:w-full transition-all duration-300"></div>
				</div>
				<div className="flex flex-col gap-2">
					{groups?.slice(0, 2)?.map((group, index) => (
						<div
							key={index}
							className="text-white rounded-lg bg-primary-200 hover:bg-primary-100/60 p-2 cursor-pointer"
							onClick={() => navigate(`/group/${group._id}`)}>
							<div className="relative flex gap-2 items-start">
								<div>
									{group?.groupImage ? (
										<img
											src={group?.groupImage}
											alt=""
											className=" w-14 rounded-md h-14 object-cover"
										/>
									) : (
										<div className=" h-14 w-14 grid place-content-center bg-gradient-to-br from-blue-700 rounded-md to-blue-300">
											<HiUserGroup size={20} />
										</div>
									)}
								</div>
								<div className="text-gray-400">
									<p className="text-white cursor-pointer w-60 whitespace-nowrap overflow-hidden text-ellipsis">
										{group?.groupName}
									</p>
									<p className="w-64 whitespace-nowrap overflow-hidden text-ellipsis">
										{group?.groupDescription}
									</p>
								</div>
								<HiUserGroup className="absolute top-2 right-2" />
							</div>
						</div>
					))}
				</div>
			</section>
			<Policy />
		</section>
	);
};

export default Sidebar;
