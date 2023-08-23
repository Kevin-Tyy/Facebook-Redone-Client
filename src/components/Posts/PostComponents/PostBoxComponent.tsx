import ReactionPallete from "./ReactionPallete";
import useDateFormatter from "../../../hooks/useDate";
import {
	CommentOutlined,
	DeleteOutlineOutlined,
	MoreVert,
	NotificationsOffOutlined,
	RemoveRedEyeOutlined,
} from "@mui/icons-material";
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

interface PostBoxProps {
	post: Posts;
}

const PostBox: React.FC<PostBoxProps> = ({ post }) => {
	const { postId, creator, postText, createdAt, likes, comments } = post;
	const formattedDate = useDateFormatter(createdAt);
	const [isPostInView, setPostInView] = useState(false);
	const [showToggle, setShowToggle] = useState(false);
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
			toast.success(data.msg);
		} else {
			toast.error(data.msg);
		}
	};

	return (
		<>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, amount: 0.1 }}
				transition={{ duration: 0.4 }}
				variants={{
					hidden: { opacity: 0, x: -10 },
					visible: { opacity: 1, x: 0 },
				}}
				className="relative bg-primary-200 rounded-2xl px-3 py-3 md:px-6  border border-gray-800">
				{creator?.userId == userId && (
					<p className="text-xs -my-1 text-gray-400">You posted</p>
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
									<p className="text-light capitalize">{creator?.username}</p>
									<p className="text-xs text-light/60">{formattedDate}</p>
								</div>
							</div>
						</Link>
						<div
							onClick={() => setShowToggle(true)}
							className="text-white self-start  rounded-full p-1 flex justify-center items-center cursor-pointer transition duration-300 hover:bg-primary-100/60 ">
							<MoreVert sx={{ fontSize: 30 }} />
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-white">{postText}</h1>
						<div className="flex flex-col gap-2">
							<div className="relative cursor-pointer group" onClick={viewPost}>
								<img
									src={post.postMedia && "/code.jpg"}
									className="w-full max-h-[500px] object-cover rounded-xl "
								/>
								<div className="bg-white absolute inset-0  h-full w-full opacity-0 group-hover:opacity-[0.02] transition group-active:opacity-5"></div>
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
							/>
						</div>
					</div>
				</div>

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
						className="absolute top-24 right-6 bg-primary-200 border rounded-xl border-gray-700 p-2 z-50">
						<ul className="text-light flex flex-col ">
							{creator?.userId == userId && (
								<li
									onClick={handleDeleteRequest}
									className="p-4 pr-10 border-b border-gray-700 gap-2 hover:bg-gray-800/70 transition rounded-md cursor-pointer">
									<DeleteOutlineOutlined />
									Delete Post
								</li>
							)}
							<li
								onClick={() => setPostInView(true)}
								className="p-4 pr-10 flex items-start border-b border-gray-700 gap-2 hover:bg-gray-800/70 transition rounded-md cursor-pointer">
								<RemoveRedEyeOutlined />
								View Post
							</li>
							<li className="p-4 pr-10 flex items-start border-b border-gray-700 gap-2 hover:bg-gray-800/70 transition rounded-md cursor-pointer">
								<NotificationsOffOutlined /> Mute Notification for this post
							</li>
							<li
								onClick={() => setPostInView(true)}
								className="p-4 pr-10 flex items-start gap-2 hover:bg-gray-800/70 transition rounded-md cursor-pointer">
								<CommentOutlined /> Comment about this post
							</li>
						</ul>
					</motion.div>
				)}
			</motion.div>
			{isPostInView && (
				<PostPreview
					viewPost={viewPost}
					post={post}
					setlikecount={setlikecount}
					likecount={likecount}
					commentcount={commentcount}
					setcommentcount={setcommentcount}
					likedByLoggedInUser={likedByLoggedInUser}
					setLikedByLoggedInUser={setLikedByLoggedInUser}
				/>
			)}
		</>
	);
};

export default PostBox;
