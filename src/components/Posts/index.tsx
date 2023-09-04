import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURL } from "../../utils/Link";
import PostBox from "./PostComponents/PostBoxComponent";
import PostSkeleton from "../Loaders/Skeleton/Post";
import { Posts as PostType } from "../../types/types";
import RepostBox from "./PostComponents/RepostComponent";
import PostComponent from "./Post";
import { toast } from "react-hot-toast";
import { BsTools } from "react-icons/bs";
import GroupSharedBox from "./PostComponents/GroupSharedComp";

const Posts = () => {
	const [posts, setPosts] = useState<Array<PostType>>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const fetchPosts = async (url: string) => {
		const { data } = await axios.get(url);
		const posts = data.data;
		setPosts(posts);
	};

	const initialFetchPosts = (url: string) => {
		setLoading(true);
		axios
			.get(url)
			.then((response) => {
				setPosts(response.data.data);
			})
			.catch((error) => {
				toast.error(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		initialFetchPosts(`${BaseURL}/post/`);
	}, [BaseURL]);
	return (
		<div className="flex flex-col gap-3 sm:gap-6">
			<PostComponent fetchPosts={fetchPosts} />
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
										post.isGroupShared ? (
											<GroupSharedBox post={post} fetchPosts={fetchPosts} />
										) : (
											<RepostBox post={post} fetchPosts={fetchPosts} />
										)
									) : (
										<PostBox post={post} fetchPosts={fetchPosts} />
									)}
								</div>
							))}
						</div>
					</div>
				)}
				{posts.length < 1 && (
					<div className="grid place-content-center mt-10">
						<div className="flex space-x-2 items-center text-slate-700 dark:text-white">
							<BsTools size={20} />
							<p className="text-lg">Couldn't retrive posts</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Posts;
