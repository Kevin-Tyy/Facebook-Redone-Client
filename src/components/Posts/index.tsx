import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURL } from "../../utils/Link";
import PostComponent from "./PostComponents/PostBoxComponent";
import PostSkeleton from "../Loaders/Skeleton/Post";
import { Posts as PostType } from "../../types/Types";
import RepostBox from "./PostComponents/RepostComponent";

const Posts = () => {
	const [posts, setPosts] = useState<Array<PostType>>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const fetchPosts = async (url: string) => {
		setLoading(true);
		const { data } = await axios.get(url);
		const posts = data.data;
		setPosts(posts);
		setLoading(false);
	};

	useEffect(() => {
		fetchPosts(`${BaseURL}/post`);
	}, [BaseURL]);
	return (
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
									<RepostBox post={post}/>
								) : (
									<PostComponent post={post} />
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Posts;
