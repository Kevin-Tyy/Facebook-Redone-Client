import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseURL } from "../../utils/Link";
import { CircularProgress } from "@mui/material";

type Props = {};
interface Post {
	postText: string;
	postMedia: string;
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
				<div >
					{posts.map((post, index) => (
						<div key={index} className="bg-primary-200 p-10">
							<h1 className="text-white">{post.postText}</h1>
							<img src={post.postMedia} className="w-full h-[400px] object-cover"/>
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
