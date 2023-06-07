import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseURL } from "../../utils/Link";
import { CircularProgress } from "@mui/material";
import PostComponent from "./PostComponents/PostBoxComponent";
type Props = {};
interface Post {
	postText: string;
	postMedia: string;
	createdAt: Date;
}
const Posts = ({}: Props) => {
	const [posts, setPosts] = useState<Array<Post> | null>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const fetchPosts = async (url: string) => {
		setLoading(true);
		const { data } = await axios.get(url);
		const posts = data.data;
		setPosts(posts);
		setLoading(false);
	};
	console.log(posts);

	useEffect(() => {
		fetchPosts(`${BaseURL}/post/`);
	}, [BaseURL]);
	return (
		<div className="h-full w-full">
			{posts ? (
				<div className="flex flex-col gap-6">
					{posts.map((post, index) => (
						<div>
							<PostComponent key={index} {...post} />
						</div>
					))}
				</div>
			) : (
				<div className="h-full w-full flex justify-center items-center text-white">
					<CircularProgress color="inherit" />
					<p>Loading...</p>
				</div>
			)}
		</div>
	);
};

export default Posts;
