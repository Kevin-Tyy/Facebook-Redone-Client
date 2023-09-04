import React, { useState, useRef, useEffect } from "react";
import {
	EmojiEmotionsOutlined,
	GifBoxOutlined,
	ImageOutlined,
	SendRounded,
} from "@mui/icons-material";
import axios from "axios";
import { BaseURL } from "../../../../utils/Link";
import { Emoji, Posts, UserInfo } from "../../../../types/types";
import { loggedInUser } from "../../../../redux/features/AuthSlice";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import EmojiPicker, { Theme } from "emoji-picker-react";
import placeholderAvatar from "../../../../assets/avatar.webp";

interface CommentFormProps {
	setcommentcount: (value: any) => any;
	commentcount: number;
	post: Posts;
}
const CommentForm: React.FC<CommentFormProps> = ({
	setcommentcount,
	post,
	commentcount,
}) => {
	const { postId } = post;
	const pickerRef = useRef<HTMLDivElement | null>(null);
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const [commentText, setCommentText] = useState<string>("");
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
			userInfo: { userId, profileimage },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!commentText || !commentText.split("").length) return;
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
	return (
		<>
			<div className="flex gap-2 items-start p-3  bg-slate-100 dark:bg-primary-200 border-t  border-slate-400 dark:border-gray-700 sticky bottom-0">
				<div className="bg-slate-400 dark:bg-primary-100 p-1 w-[55px] h-[50px] rounded-full">
					<img
						src={profileimage || placeholderAvatar}
						className="h-full  w-full rounded-full"
					/>
				</div>
				<form
					onSubmit={handleSubmit}
					className="bottom-0  bg-slate-300/50 dark:bg-primary-100/60 w-full p-2 rounded-xl focus-within:outline outline-1 placeholder-slate-500 outline-slate-400 dark:outline-gray-700">
					<textarea
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
						className="w-full resize-none bg-transparent outline-none  text-slate-700 dark:text-white p-1"
						placeholder="Write a comment"></textarea>
					<div className="text-light flex justify-between items-center">
						<div className="flex gap-1" onClick={() => setShowPicker(true)}>
							<EmojiEmotionsOutlined sx={{ fontSize: 20 }} />
							<ImageOutlined sx={{ fontSize: 20 }} />
							<GifBoxOutlined sx={{ fontSize: 20 }} />
						</div>
						<button className="hover:bg-slate-300 dark:hover:bg-gray-700/60 p-1 transiton rounded-full text-blue-base">
							<SendRounded sx={{ fontSize: 25 }} />
						</button>
					</div>
				</form>
			</div>
			{showPicker && (
				<div
					onClick={(e) => e.stopPropagation()}
					className="absolute"
					ref={pickerRef}>
					<EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme.DARK} />
				</div>
			)}
		</>
	);
};

export default CommentForm;
