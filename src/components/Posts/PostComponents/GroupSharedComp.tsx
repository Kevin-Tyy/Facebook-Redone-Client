import ReactionPallete from "../common/ReactionPallete";
import useDateFormatter from "../../../hooks/useDate";
import { MoreHoriz } from "@mui/icons-material";
import { HiOutlineTrash, HiUserGroup } from "react-icons/hi2";
import { AiOutlineEye, AiOutlineBell } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BsArrowRepeat } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import placeholderImage from "../../../assets/avatar.webp";
import { Link } from "react-router-dom";
import { UserInfo } from "../../../types/types";
import PostPreview from "../Preview/PostPreview";
import { motion } from "framer-motion";
import axios from "axios";
import { BaseURL } from "../../../utils/Link";
import { toast } from "react-hot-toast";
import { Posts } from "../../../types/types";
import RepostModal from "../../Modals/RepostModal";
import StyledHashtags from "../../../hooks/useHashTags";

interface Props {
	post: Posts;
	fetchPosts: (url: string) => Promise<void>;
}

const GroupSharedComponent: React.FC<Props> = ({ post, fetchPosts }) => {
	const {
		postId,
		creator,
		postText,
		createdAt,
		likes,
		comments,
		repostedBy,
		repostedDate,
		group,
	} = post;
	const [isPostInView, setPostInView] = useState(false);
	const [showToggle, setShowToggle] = useState(false);
	const [repostModal, setRepostModal] = useState(false);
	const toggleRef = useRef<HTMLDivElement | null>(null);
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const [likedByLoggedInUser, setLikedByLoggedInUser] = useState(
		likes.some((like) => like?.userId === userId)
	);
	const [likecount, setlikecount] = useState<number>(likes.length);
	const [commentcount, setcommentcount] = useState<number>(comments.length);

	const handleOutsideClick = (e: any) => {
		if (toggleRef.current && !toggleRef.current.contains(e.target)) {
			setShowToggle(false);
		}
	};
	const viewPost = () => {
		setPostInView(!isPostInView);
	};
	useEffect(() => {
		return () => {
			document.addEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	//delete a post
	const handleDeleteRequest = async () => {
		const { data } = await axios.delete(`${BaseURL}/post/${postId}`);
		if (data?.success) {
			fetchPosts(`${BaseURL}/post/`).then(() => {
				toast.success(data.msg);
			});
		} else {
			toast.error(data.msg);
		}
	};

	return (
		<>
			<motion.div className="relative flex flex-col bg-slate-200 dark:bg-primary-200 rounded-xl sm:rounded-2xl p-1 sm:p-3  border dark:border-gray-800">
				{repostedBy?.userId == userId && (
					<p className="text-xs -my-1 text-gray-400">You reposted this.</p>
				)}
				<div>
					<div className="flex justify-between items-start">
						<Link to={`/profile/${repostedBy?.userId}`}>
							<div className="flex gap-3 items-center pt-3 pb-2">
								<div className="bg-slate-400 dark:bg-primary-100 p-[3px] rounded-full">
									<img
										src={
											repostedBy?.profileimage
												? repostedBy?.profileimage
												: placeholderImage
										}
										className="w-12 h-12  rounded-full object-cover"
									/>
								</div>
								<div className="flex flex-col">
									<p className=" text-slate-700 dark:text-light capitalize">
										{repostedBy?.firstname} {repostedBy.lastname}
									</p>
									<div className="flex items-center space-x-2 text-gray-500/80">
										<p className="text-sm text-gray-500">
											<span className="text-sm capitalize">
												@{repostedBy?.username}{" "}
											</span>
											shared this from a group
										</p>
										<span>•</span>
										<p className="text-sm">{useDateFormatter(createdAt)}</p>
									</div>
								</div>
							</div>
						</Link>
						<div
							onClick={() => setShowToggle(true)}
							className="text-white self-start  rounded-full p-1 m-2 flex justify-center items-center cursor-pointer transition duration-300 hover:bg-slate-200/50 dark:hover:bg-primary-100/60 ">
							<MoreHoriz sx={{ fontSize: 30 }} />
						</div>
					</div>
				</div>
				<div className="flex gap-4 sm:gap-6 px-2 sm:px-4">
					<div className="w-1 flex-1 rounded-full ml-2 my-2 bg-slate-400/60 dark:bg-gray-700 text-transparent">
						l
					</div>
					<div className="flex self-end w-full flex-col">
						<div className="flex justify-between items-start">
							<Link to={`/group/${group?._id}`}>
								<div className="flex gap-3 items-center pb-3 ">
									<div className="relative rounded-full">
										<div className="bg-gradient-to-br from-blue-700 to-blue-200 h-14 w-14 grid place-content-center rounded-md text-white">
											<HiUserGroup size={24} />
										</div>
										<div className="bg-slate-200 dark:bg-primary-200 p-1 absolute -right-4 top-8 rounded-full">
											<img
												src={
													creator?.profileimage
														? creator?.profileimage
														: placeholderImage
												}
												className="w-7 h-7 rounded-full object-cover"
											/>
										</div>
									</div>
									<div className="flex flex-col">
										<p className=" text-slate-700 dark:text-light text-sm space-x-2">
											<span className="first-letter:capitalize ">{group?.groupName}</span>
											<span>•</span>
											<span className="text-sm lowercase ">group</span>
										</p>
										<div className="flex items-center space-x-2 text-gray-500/80">
											<p className="text-sm capitalize">@{creator?.username} in {group?.groupName}</p>
											<span>•</span>
											<p className="text-sm">
												{useDateFormatter(repostedDate)}
											</p>
										</div>{" "}
									</div>
								</div>
							</Link>
						</div>
						<div className="flex flex-col gap-4 pt-4" onClick={viewPost}>
							<h1 className="text-white cursor-pointer">
								<StyledHashtags text={postText} />
							</h1>
							<div className="flex flex-col gap-2">
								<div className="relative cursor-pointer group">
									<img
										src={post.postMedia && post.postMedia}
										className="w-full max-h-[500px] object-cover rounded-xl "
									/>
									<div className="bg-white absolute inset-0  h-full w-full opacity-0 group-hover:opacity-[0.02] transition group-active:opacity-5"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<ReactionPallete
					userId={userId}
					postId={postId}
					likedByLoggedInUser={likedByLoggedInUser}
					setLikedByLoggedInUser={setLikedByLoggedInUser}
					setLikecount={setlikecount}
					likecount={likecount}
					setPostInView={setPostInView}
					commentCount={commentcount}
					setRepostModal={() => setRepostModal(true)}
					viewCount={post.views.length}
					post={post}
				/>

				{showToggle && (
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.1 }}
						transition={{ duration: 0.15, delay: 0.2 }}
						variants={{
							hidden: { opacity: 0, y: -30 },
							visible: { opacity: 1, y: 0 },
						}}
						ref={toggleRef}
						className="absolute top-16 right-6 bg-slate-300/50 dark:bg-primary-200/50 backdrop-blur-lg ring-1 rounded-xl ring-slate-300 dark:ring-gray-700 p-1 z-50">
						<ul className="text-slate-800 dark:text-white flex flex-col ">
							{post?.repostedBy?.userId == userId && (
								<li
									onClick={handleDeleteRequest}
									className="p-3 pr-10 flex gap-3 hover:bg-slate-200/50 dark:hover:bg-primary-100/50 transition rounded-md cursor-pointer">
									{<HiOutlineTrash size={18} />}
									Delete Post
								</li>
							)}
							<li
								onClick={() => setPostInView(true)}
								className="p-3 pr-10 flex items-center gap-3 hover:bg-slate-200/50 dark:hover:bg-primary-100/50 transition rounded-md cursor-pointer">
								{<AiOutlineEye size={18} />}
								View Post
							</li>
							<li className="p-3 pr-10 flex items-center gap-3 hover:bg-slate-200/50 dark:hover:bg-primary-100/50 transition rounded-md cursor-pointer">
								{<AiOutlineBell size={18} />} Mute Notifications
							</li>
							<li
								onClick={() => setRepostModal(true)}
								className="p-3 pr-10 flex items-center gap-3 hover:bg-slate-200/50 dark:hover:bg-primary-100/50 transition rounded-md cursor-pointer">
								{<BsArrowRepeat size={18} />} Repost this
							</li>

							<li
								onClick={() => setPostInView(true)}
								className="p-3 pr-10 flex items-center gap-3 hover:bg-slate-200/50 dark:hover:bg-primary-100/50 transition rounded-md cursor-pointer">
								{<FaRegComment />} Add your comment
							</li>
						</ul>
					</motion.div>
				)}
			</motion.div>
			<PostPreview
				isOpen={isPostInView}
				onClose={viewPost}
				post={post}
				setlikecount={setlikecount}
				likecount={likecount}
				commentcount={commentcount}
				setcommentcount={setcommentcount}
				likedByLoggedInUser={likedByLoggedInUser}
				setLikedByLoggedInUser={setLikedByLoggedInUser}
				fetchPosts={fetchPosts}
			/>

			<RepostModal
				post={post}
				onClose={() => setRepostModal(false)}
				isOpen={repostModal}
				fetchPosts={fetchPosts}
			/>
		</>
	);
};

export default GroupSharedComponent;
