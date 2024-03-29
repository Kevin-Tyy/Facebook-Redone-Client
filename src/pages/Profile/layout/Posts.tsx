import Box from "../../../components/Posts/PostComponents/PostBoxComponent";
import ProfileDetail from "../../../components/Detail/ProfileDetail";
import Skeleton from "react-loading-skeleton";
import PostSkeleton from "../../../components/Loaders/Skeleton/Post";
import PostComponent from "../../../components/Posts/Post";
import { Posts, Userdata } from "../../../types/types";
import RepostBox from "../../../components/Posts/PostComponents/RepostComponent";
import axios from "axios";
import GroupSharedBox from "../../../components/Posts/PostComponents/GroupSharedComp";
interface Props {
	loading: boolean;
	userData: Userdata | null;
	userId: string;
	isOpen: boolean;
	setIsOpen: any;
	posts: Posts[] | null;
	setPosts: (value: any) => void;
}
const PostLayout = ({
	loading,
	userData,
	userId,
	isOpen,
	setIsOpen,
	posts,
	setPosts,
}: Props) => {
	const fetchUserPosts = async (url: string) => {
		try {
			const {
				data: { data },
			} = await axios.get(url);
			setPosts(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className="flex flex-col items-start lg:flex-row gap-5">
				<div className="bg-slate-200 dark:bg-primary-200 w-full lg:max-w-[500px] p-5 xl:sticky top-[140px] rounded-lg border dark:border-gray-700/50">
					<div>
						{loading ? (
							<Skeleton height={40} />
						) : (
							<h1 className="text-xl  text-slate-700 dark:text-light text-center">
								About{" "}
								<span className="capitalize text-blue-base text-xl">
									{userData?.userId == userId ? "You" : userData?.username}
								</span>
							</h1>
						)}
						<hr className="border-1 border-slate-400 dark:border-gray-700 my-6" />
						<ProfileDetail
							userId={userId}
							userData={userData}
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							loading={loading}
						/>
					</div>
				</div>
				<div className="w-full sm:min-w-[600px] flex flex-col gap-4">
					{userData?.userId == userId && (
						<PostComponent fetchPosts={fetchUserPosts} />
					)}
					{userData?.username && (
						<div className="bg-slate-200 dark:bg-primary-200 p-2 rounded-md border dark:border-gray-800">
							<h1 className=" text-slate-700 dark:text-light text-3xl text-center capitalize">
								{userData?.userId == userId
									? "Your"
									: `${userData?.username}'s`}{" "}
								Posts
							</h1>
						</div>
					)}
					{loading ? (
						<PostSkeleton />
					) : (
						<div>
							{posts && posts.length ? (
								<div className="flex flex-col gap-6 ">
									{posts.map((post, index) => (
										<div key={index}>
											{post.isReposted ? (
												post?.isGroupShared ? (
													<GroupSharedBox
														post={post}
														fetchPosts={fetchUserPosts}
													/>
												) : (
													<RepostBox post={post} fetchPosts={fetchUserPosts} />
												)
											) : (
												<Box post={post} fetchPosts={fetchUserPosts} />
											)}
										</div>
									))}
								</div>
							) : (
								<p className="text-center  text-slate-700 dark:text-light text-xl mt-4">
									😞
									{userData?.userId == userId ? (
										"You haven't"
									) : (
										<span className="first-letter:uppercase text-xl">
											{userData?.username} hasn't
										</span>
									)}{" "}
									posted anything yet
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PostLayout;
