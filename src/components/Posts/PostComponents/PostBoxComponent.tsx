import ReactionPallete from "../common/ReactionPallete";
import useDateFormatter from "../../../hooks/useDate";
import { MoreHoriz } from "@mui/icons-material";
import * as iconshi from "react-icons/hi2";
import * as iconsai from "react-icons/ai";
import * as iconsfa from "react-icons/fa";
import * as iconsbs from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import placeholderImage from "../../../assets/avatar.webp";
import { Link } from "react-router-dom";
import { UserInfo } from "../../../types/Types";
import PostPreview from "../Preview/PostPreview";
import { motion } from "framer-motion";
import axios from "axios";
import { BaseURL } from "../../../utils/Link";
import { toast } from "react-hot-toast";
import { Posts } from "../../../types/Types";
import RepostModal from "../../Modals/RepostModal";
import StyledHashtags from "../../../hooks/useHashTags";

interface PostBoxProps {
	post: Posts;
	fetchPosts?: (url: string) => Promise<void>;
}

const PostBox: React.FC<PostBoxProps> = ({ post, fetchPosts }) => {
	const { postId, creator, postText, createdAt, likes, comments } = post;
	const formattedDate = useDateFormatter(createdAt);
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
	const viewCount: number = post.views.length;
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
			fetchPosts(`${BaseURL}/post`).then(() => {
				toast.success(data.msg);
			});
		} else {
			toast.error(data.msg);
		}
	};

	return (
		<>
			<motion.div className="relative bg-primary-200 rounded-xl sm:rounded-2xl px-3 py-3 md:px-6  border border-gray-800">
				{creator?.userId == userId && (
					<p className="text-xs -my-1 text-gray-400">You posted this.</p>
				)}
				<div className="flex flex-col gap-4">
					<div className="flex justify-between items-start">
						<Link to={`/profile/${creator?.userId}`}>
							<div className="flex gap-3 items-center py-3 ">
								<div className="bg-primary-100 p-[3px] rounded-full">
									<img
										src={
											creator?.profileimage
												? creator?.profileimage
												: placeholderImage
										}
										className="w-12 h-12  rounded-full object-cover"
									/>
								</div>
								<div className="flex flex-col">
									<p className="text-light capitalize">
										{creator?.firstname} {creator?.lastname}
									</p>
									<div className="flex items-center space-x-2 text-gray-500/80">
										<p className="text-sm capitalize">@{creator?.username}</p>
										<span>•</span>
										<p className="text-sm">{formattedDate}</p>
									</div>
								</div>
							</div>
						</Link>
						<div
							onClick={() => setShowToggle(true)}
							className="text-white self-start  rounded-full p-1 flex justify-center items-center cursor-pointer transition duration-300 hover:bg-primary-100/60 ">
							<MoreHoriz sx={{ fontSize: 30 }} />
						</div>
					</div>
					<div className="flex flex-col gap-2" onClick={viewPost}>
						<h1 className="text-white cursor-pointer inline">
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
					viewCount={viewCount}
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
						className="absolute top-16 right-6 bg-primary-200/10 backdrop-blur-lg ring-1 rounded-xl ring-gray-700 p-1 z-50">
						<ul className="text-white flex flex-col ">
							{creator?.userId == userId && (
								<li
									onClick={handleDeleteRequest}
									className="p-3 pr-10 flex gap-3 hover:bg-primary-100/50 transition rounded-md cursor-pointer">
									{<iconshi.HiOutlineTrash size={18} />}
									Delete Post
								</li>
							)}
							<li
								onClick={() => setPostInView(true)}
								className="p-3 pr-10 flex items-center gap-3 hover:bg-primary-100/50 transition rounded-md cursor-pointer">
								{<iconsai.AiOutlineEye size={18} />}
								View Post
							</li>
							<li
								onClick={() => setRepostModal(true)}
								className="p-3 pr-10 flex items-center gap-3 hover:bg-primary-100/50 transition rounded-md cursor-pointer">
								{<iconsbs.BsArrowRepeat size={18} />} Repost this
							</li>
							<li className="p-3 pr-10 flex items-center gap-3 hover:bg-primary-100/50 transition rounded-md cursor-pointer">
								{<iconsai.AiOutlineBell size={18} />} Mute Notifications
							</li>
							<li
								onClick={() => setPostInView(true)}
								className="p-3 pr-10 flex items-center gap-3 hover:bg-primary-100/50 transition rounded-md cursor-pointer">
								{<iconsfa.FaRegComment />} Add your comment
							</li>
						</ul>
					</motion.div>
				)}
			</motion.div>
			<PostPreview
				post={post}
				isOpen={isPostInView}
				onClose={viewPost}
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

export default PostBox;
