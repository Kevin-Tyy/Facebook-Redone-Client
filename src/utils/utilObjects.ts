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
export const trendDummyData = [
	{
		title : 'UI/UX design',
		subtitle : 'Tech - Trending',
		statistics : '19.4K Posts'
	},
	{
		title : 'Product design',
		subtitle : 'Design - Trending',
		statistics : '460K Posts'
	},
	{
		title : 'Frontend development',
		subtitle : 'Trending in Rwanda',
		statistics : '1.8M Posts'
	},
	{
		title : 'ChatGPT',
		subtitle : 'AI - Trending',
		statistics : '75.6K Posts'
	},
	{
		title : 'MidJourney',
		subtitle : 'Artificial Intelligence - Trending',
		statistics : ''
	},
	{
		title : 'DALLE 2',
		subtitle : 'Trending in Rwanda',
		statistics : '12.4K Posts'
	},
	{
		title : 'OpenAI',
		subtitle : 'Technology - Trending',
		statistics : '19.4K Posts'
	},
	{
		title : 'Business',
		subtitle : 'Trending in Rwanda',
		statistics : ''
	}
]
