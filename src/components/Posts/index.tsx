import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURL } from "../../utils/Link";
import PostBox from "./PostComponents/PostBoxComponent";
import PostSkeleton from "../Loaders/Skeleton/Post";
import { Posts as PostType } from "../../types/Types";
import RepostBox from "./PostComponents/RepostComponent";
import PostComponent from "./Post";

const Posts = () => {
	const [posts, setPosts] = useState<Array<PostType>>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const fetchPosts = async (url: string) => {
		const { data } = await axios.get(url);
		const posts = data.data;
		setPosts(posts);
	};
	
	const initialFetchPosts = async (url: string) => {
		setLoading(true);
		const { data } = await axios.get(url);
		const posts = data.data;
		setPosts(posts);
		setLoading(false);
	};

	useEffect(() => {
		initialFetchPosts(`${BaseURL}/post/`)
	}, [BaseURL]);
	return (
		<div className="flex flex-col gap-3 sm:gap-6">
			<PostComponent fetchPosts={fetchPosts}/>
			<div className="h-full w-full">
				{loading ? (
					<div>
						<PostSkeleton />
					</div>
				) : (
					<div>
						<div className="flex flex-col gap-3 sm:gap-6">
							{posts.map((post, index) => (
								<div key={index}>
									{post.isReposted ? (
										<RepostBox post={post} fetchPosts={fetchPosts}/>
									) : (
										<PostBox post={post} fetchPosts={fetchPosts}/>
									)}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Posts;
