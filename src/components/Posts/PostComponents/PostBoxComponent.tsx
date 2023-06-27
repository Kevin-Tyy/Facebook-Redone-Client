import CommentComponent from "./CommentComponent";
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
const Box = ({
	postId,
	postMedia,
	creator,
	postText,
	createdAt,
	likes,
	comments,
}: Posts) => {
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
	const [likecount, setlikecount] = useState(likes.length);
	const [commentcount, setcommentcount] = useState(comments.length);

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
	const handleDeleteRequest = async () => {
		const { data } = await axios.delete(`${BaseURL}/post/${postId}`);
		if (data?.success) {
			toast.success(data.msg);
		} else {
			toast.error(data.msg);
		}
	};
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false, amount: 0.1 }}
			transition={{ duration: 0.2}}
			variants={{
				hidden: { opacity: 0, y: -30 },
				visible: { opacity: 1, y: 0 },
			}}
			className="relative bg-primary-200 rounded-2xl px-3 py-3 md:px-6  border border-gray-800">
			{creator?.userId == userId && (
				<p className="text-xs -my-1 text-gray-400">You posted</p>
			)}
			<div className="flex flex-col gap-4">
				<div className="flex py-3 justify-between border-b border-gray-600">
					<Link to={`/profile/${creator?.userId}`}>
						<div className="flex gap-3 items-center">
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
						className="text-primary-100 hover:bg-gray-950/80 rounded-full w-14 flex justify-center items-center cursor-pointer transition duration-300 active:bg-gray-950/50 p-2 ">
						<MoreVert />
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h1 className="text-white">{postText}</h1>
					<div className="flex flex-col gap-2">
						<div className="relative cursor-pointer" onClick={viewPost}>
							<img
								src={postMedia}
								className="w-full max-h-[500px] object-cover rounded-xl "
							/>
							<div className="bg-black/30 absolute h-full w-full top-0 right-0 bottom-0 left-0 opacity-0 transition active:opacity-75"></div>
						</div>
						<div className="flex justify-between text-light px-4 ">
							<span className="hover:underline cursor-pointer">
								{likes && likecount} Like{likecount !== 1 ? "s" : ""}
							</span>
							<span className="hover:underline cursor-pointer">
								{comments && commentcount} comment
								{commentcount !== 1 && "s"}
							</span>
						</div>
						<CommentComponent
							userId={userId}
							postId={postId}
							likedByLoggedInUser={likedByLoggedInUser}
							setLikedByLoggedInUser={setLikedByLoggedInUser}
							setLikecount={setlikecount}
							likecount={likecount}
							viewPost={viewPost}
							setPostInView={setPostInView}
						/>
					</div>
				</div>
			</div>
			{isPostInView && (
				<PostPreview
					postMedia={postMedia}
					postText={postText}
					viewPost={viewPost}
					creator={creator}
					createdAt={createdAt}
					setlikecount={setlikecount}
					likecount={likecount}
					commentcount={commentcount}
					setcommentcount={setcommentcount}
					userId={userId}
					postId={postId}
					likedByLoggedInUser={likedByLoggedInUser}
					setLikedByLoggedInUser={setLikedByLoggedInUser}
				/>
			)}
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
					className="absolute top-24 right-6 bg-primary-200 border rounded-xl border-gray-700 p-2">
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
	);
};

export default Box;
