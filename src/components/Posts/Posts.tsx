import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseURL } from "../../utils/Link";
import { CircularProgress } from "@mui/material";

type Props = {};
interface Post {
	postText: string;
	postMedia: string;
}
const Posts = (props: Props) => {
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
		<div className="h-screen w-full bg-gray-950">
			{posts ? (
				<div>
					{posts.map((post, index) => (
						<div key={index}>
							<h1 className="text-white">{post.postText}</h1>
                            <p className="text-gray-400">
                                {post.postMedia ? (
                                    `${post.postMedia}`
                                ) : (
                                    "No image" 
                                )}
                            </p>
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
