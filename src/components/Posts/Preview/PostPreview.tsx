import { Comment, Creator, Emoji, UserInfo } from "../../../types/Types";
import {
	CloseRounded,
	EmojiEmotionsOutlined,
	GifBoxOutlined,
	ImageOutlined,
	SendRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import placeholderImage from "../../../assets/avatar.webp";
import useDateFormatter from "../../../hooks/useDate";
import CommentComponent from "../PostComponents/CommentComponent";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BaseURL } from "../../../utils/Link";
import { Toaster, toast } from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";
import { motion } from "framer-motion";
interface Props {
	postMedia: string;
	postText: string;
	viewPost: (value: any) => void;
	creator: Creator;
	createdAt: Date;
	setlikecount: (value: number) => void;
	likecount: number;
	userId: string;
	postId: string;
	likedByLoggedInUser: boolean;
	setLikedByLoggedInUser: (value: any) => void;
	commentcount: number;
	setcommentcount: (value: any) => void;
}
const PostPreview = ({
	postMedia,
	postText,
	viewPost,
	creator,
	createdAt,
	setlikecount,
	likecount,
	postId,
	likedByLoggedInUser,
	setLikedByLoggedInUser,
	commentcount,
	setcommentcount,
}: Props) => {
	const formattedDate = useDateFormatter(createdAt);
	const [commentText, setCommentText] = useState<string>("");
	const [comments, setcomments] = useState<Comment[]>([]);
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const pickerRef = useRef(null);
	const handleEmojiClick = (emojiObj: Emoji) => {
		setCommentText((prev) => prev + emojiObj.emoji);
	};
	const handleClickOutside = (e: any) => {
		if (pickerRef?.current && !pickerRef?.current.contains(e.target)) {
			setShowPicker(false);
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.addEventListener("mousedown ", handleClickOutside);
		};
	}, []);

	const {
		user: {
			userInfo: { profileimage, userId },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: UserInfo } };

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const { data } = await axios.post(`${BaseURL}/post/react/comment`, {
			postId: postId,
			userId: userId,
			content: commentText,
		});
		if (data.success) {
			toast.success(data.msg);
			setcommentcount(commentcount + 1);
		} else {
			toast.error(data.msg);
		}
	};
	const populateComments = async () => {
		const { data } = await axios.get(`${BaseURL}/post/react/comment/${postId}`);
		if (data.success) {
			setcomments(data.data);
			setcommentcount(data.data.length);
		}
		setCommentText("");
	};
	useEffect(() => {
		populateComments();
	}, [commentcount]);
	console.log(comments);
	return (
		<div
			className="h-screen w-full fixed top-0 right-0 left-0 bottom-0 bg-gray-950/50 backdrop-blur-md z-[10] flex justify-center items-center"
			onClick={viewPost}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.1 }}
				transition={{ duration: 0.2 }}
				variants={{
					hidden: { opacity: 0, y: -30 },
					visible: { opacity: 1, y: 0 },
				}}>
				<div className="relative bg-primary-200 min-w-[600px] max-w-[630px] flex flex-col gap-4  max-h-[1000px] border border-gray-700  overflow-y-scroll">
					<div className="sticky top-0 bg-primary-200">
						<div
							onClick={viewPost}
							className="absolute  top-4 right-4 bg-gray-700 text-white rounded-full p-1.5 cursor-pointer hover:bg-gray-800 active:bg-gray-600">
							<CloseRounded sx={{ fontSize: 25 }} />
						</div>
						<p className="text-light text-2xl capitalize text-center p-6 border-b border-gray-600">
							{creator?.username}'s post
						</p>
						<Link to={`/profile/${creator?.userId}`}>
							<div className="flex gap-3 px-5 py-2 items-center">
								<div className="bg-primary-100 p-0.5 rounded-full">
									<img
										src={
											creator?.profileimage
												? creator?.profileimage
												: placeholderImage
										}
										className="w-12 h-12  rounded-full"
									/>
								</div>
								<div className="flex flex-col">
									<p className="text-light capitalize">{creator?.username}</p>
									<p className="text-xs text-light/60">{formattedDate}</p>
								</div>
							</div>
						</Link>
					</div>
					<div className="flex flex-col">
						<div>
							<p className="text-white px-5">{postText}</p>
							<img
								src={postMedia}
								className="w-full max-h-[600px] object-cover"
							/>
							<div className="flex  justify-between px-4 py-2">
								<p className="text-light hover:underline cursor-pointer">
									{likecount} Like
									{likecount != 1 && "s"}
								</p>
								<div className="flex gap-3">
									<p className="text-light cursor-pointer hover:underline">
										{commentcount} Comment
										{commentcount != 1 && "s"}
									</p>
									<p className="text-light cursor-pointer hover:underline">
										0 shares
									</p>
								</div>
							</div>
							<div className="p-2">
								<CommentComponent
									userId={userId}
									postId={postId}
									likedByLoggedInUser={likedByLoggedInUser}
									setLikedByLoggedInUser={setLikedByLoggedInUser}
									setLikecount={setlikecount}
									likecount={likecount}
									viewPost={viewPost}
									setPostInView={null}
								/>
							</div>
							<div>
								{comments && comments.length > 0 ? (
									<div className="p-2 flex flex-col gap-2">
										{comments.map((comment) => (
											<div className="flex gap-2 items-center">
												<Link to={`/profile/${userId}`}>
													<div className="bg-primary-100 p-1 rounded-full">
														<img
															src={comment?.user?.profileimage}
															className="w-12 h-[45px] object-cover rounded-full"
														/>
													</div>
												</Link>
												<div className="w-full bg-gray-800 my-1 px-3 py-1 rounded-lg hover:bg-gray-700/70 transition">
													<Link to={`/profile/${comment?.user?.userId}`}>
														<h1 className="text-lg font-semibold text-white capitalize">
															{comment?.user?.username}
														</h1>
													</Link>
													<p className="text-light">{comment.textContent}</p>
												</div>
											</div>
										))}
									</div>
								) : (
									<p className="text-center text-xl text-light py-6 mx-2 border border-gray-800">
										No comments yet
									</p>
								)}
							</div>
						</div>
						<div className="flex gap-2 items-start p-3 ">
							<div className="bg-primary-100 p-1 w-[55px] h-[50px] rounded-full">
								<img
									src={profileimage}
									className="h-full  w-full rounded-full"
								/>
							</div>
							<form
								onSubmit={handleSubmit}
								className="bottom-0 bg-gray-800 w-full p-2 rounded-xl focus-within:outline outline-1 outline-light/40">
								<textarea
									value={commentText}
									onChange={(e) => setCommentText(e.target.value)}
									className="w-full resize-none bg-transparent outline-none text-white p-1"
									placeholder="Write a comment"></textarea>
								<div className="text-light flex justify-between items-center">
									<div
										className="flex gap-1"
										onClick={() => setShowPicker(true)}>
										<EmojiEmotionsOutlined sx={{ fontSize: 20 }} />
										<ImageOutlined sx={{ fontSize: 20 }} />
										<GifBoxOutlined sx={{ fontSize: 20 }} />
									</div>
									<button className="hover:bg-gray-700/60 p-1 transiton rounded-full ">
										<SendRounded sx={{ fontSize: 25 }} />
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</motion.div>
			{showPicker && (
				<div
					onClick={(e) => e.stopPropagation()}
					className="absolute"
					ref={pickerRef}>
					<EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
				</div>
			)}
			<Toaster />
		</div>
	);
};

export default PostPreview;
