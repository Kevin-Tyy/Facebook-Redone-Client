import { BiLogoMessenger, BiSolidHome } from "react-icons/bi";
import { HiUserGroup , HiUsers } from 'react-icons/hi2'
export const Tabs = ["posts", "about", "friends", "groups", "photos"];

export const navObj = [
	{ icon: BiSolidHome, title: "Home", link: "/" },
	{
		icon: HiUsers,
		title: "Friends",
		link: "/friends",
	},
	{
		icon: HiUserGroup,
		title: "Groups",
		link: "/groups",
	},
	{
		icon: BiLogoMessenger,
		title: "Watch",
		link: "/chat",
	},
];
export const trendDummyData = [
	{
		title: "Frontend development",
		subtitle: "Trending in Rwanda",
		statistics: "1.8M Posts",
	},
	{
		title: "ChatGPT",
		subtitle: "AI - Trending",
		statistics: "75.6K Posts",
	},
	{
		title: "MidJourney",
		subtitle: "Artificial Intelligence - Trending",
		statistics: "",
	},
];
