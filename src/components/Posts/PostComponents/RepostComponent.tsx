import ReactionPallete from "./ReactionPallete";
import useDateFormatter from "../../../hooks/useDate";
import {
	CommentOutlined,
	DeleteOutlineOutlined,
	MoreHoriz,
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
import RepostModal from "../../Modals/RepostModal";

interface RepostBoxProps {
	post: Posts;
}

const RepostBox: React.FC<RepostBoxProps> = ({ post }) => {
	const { postId, creator, postText, createdAt, likes, comments, repostedBy } =
		post;
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
			<motion.div className="relative flex flex-col bg-primary-200 rounded-2xl p-3  border border-gray-800">
				{creator?.userId == userId && (
					<p className="text-xs -my-1 text-gray-400">You reposted</p>
				)}
				<div>
					<div className="flex justify-between items-start">
						<Link to={`/profile/${repostedBy?.userId}`}>
							<div className="flex gap-3 items-center py-3 ">
								<div className="bg-primary-100 p-[3px] rounded-full">
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
									<p className="text-light capitalize">
										{repostedBy?.firstname} {repostedBy.lastname}
									</p>
									<p className="text-sm text-gray-500">
										<span className="text-sm capitalize">
											@{repostedBy?.username}{" "}
										</span>
										reposted this.
									</p>
								</div>
							</div>
						</Link>
						<div
							onClick={() => setShowToggle(true)}
							className="text-white self-start  rounded-full p-1 m-2 flex justify-center items-center cursor-pointer transition duration-300 hover:bg-primary-100/60 ">
							<MoreHoriz sx={{ fontSize: 30 }} />
						</div>
					</div>
				</div>
				<div className="flex gap-6 px-4">
					<div className="w-1 flex-1 rounded-full mx-2 bg-gray-700 text-transparent">
						h
					</div>
					<div className="flex self-end w-full flex-col">
						<div className="flex justify-between items-start">
							<Link to={`/profile/${creator?.userId}`}>
								<div className="flex gap-3 items-center pb-3 ">
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
											{creator?.firstname} {creator.lastname}
										</p>
										<div className="flex items-center space-x-2 text-gray-500/80">
											<p className="text-sm capitalize">@{creator?.username}</p>
											<span>•</span>
											<p className="text-sm">{formattedDate}</p>
										</div>{" "}
									</div>
								</div>
							</Link>
						</div>
						<div className="flex flex-col gap-2">
							<h1 className="text-white">{postText}</h1>
							<div className="flex flex-col gap-2">
								<div
									className="relative cursor-pointer group"
									onClick={viewPost}>
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
						className="absolute top-16 right-6 bg-primary-200 ring-1 rounded-xl ring-gray-700 p-2 z-50">
						<ul className="text-light flex flex-col ">
							{creator?.userId == userId && (
								<li
									onClick={handleDeleteRequest}
									className="p-3 pr-10 hover:bg-gray-800/70 transition rounded-md cursor-pointer">
									<DeleteOutlineOutlined />
									Delete Post
								</li>
							)}
							<li
								onClick={() => setPostInView(true)}
								className="p-3 pr-10 flex items-start gap-2 hover:bg-primary-100/30 transition rounded-md cursor-pointer">
								<RemoveRedEyeOutlined />
								View Post
							</li>
							<li className="p-3 pr-10 flex items-start gap-2 hover:bg-primary-100/30 transition rounded-md cursor-pointer">
								<NotificationsOffOutlined /> Mute Notifications
							</li>
							<li
								onClick={() => setPostInView(true)}
								className="p-3 pr-10 flex items-start gap-2 hover:bg-primary-100/30 transition rounded-md cursor-pointer">
								<CommentOutlined /> Add your comment
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
			/>

			<RepostModal
				post={post}
				onClose={() => setRepostModal(false)}
				isOpen={repostModal}
			/>
		</>
	);
};

export default RepostBox;
