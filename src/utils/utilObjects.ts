import {
	GroupRounded,
	HomeRounded,
	PeopleRounded,
	LiveTvRounded,
} from "@mui/icons-material";

export const Tabs = ["posts", "about", "friends", "groups", "photos", "videos"];

export const navObj = [
	{ icon: HomeRounded, title: "Home", link: "/" },
	{
		icon: PeopleRounded,
		title: "Friends",
		link: "/friends",
	},
	{
		icon: GroupRounded,
		title: "Groups",
		link: "/groups",
	},
	{
		icon: LiveTvRounded,
		title: "Watch",
		link: "/chat",
	},
];
