import { useEffect, useState, useRef } from "react";
import {
	EmojiEmotionsOutlined,
	GifBoxRounded,
	MoreHoriz,
} from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { Image } from "@mui/icons-material";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { UserInfo } from "../../types/types";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Emoji } from "../../types/types";
import Modal from ".";
import placeholderAvatar from "../../assets/avatar.webp";
import createNotification from "../../api/functions/notifications";
import { HiUsers } from "react-icons/hi2";
interface Props {
	onClose: () => void;
	isOpen: boolean;
	fetchPosts: (url: string) => Promise<void>;
}

const utilIcons = [
	<EmojiEmotionsOutlined fontSize="large" />,
	<GifBoxRounded fontSize="large" />,
	<MoreHoriz fontSize="large" />,
];

const PostModal = ({ onClose, isOpen, fetchPosts }: Props) => {
	const [postText, setPostText] = useState<string>("");
	const [postMedia, setPostMedia] = useState<any>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const pickerRef = useRef<HTMLDivElement | null>(null);
	const {
		user: {
			userInfo: { userId, username, profileimage },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};

	const submitPostDetails = async (url: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.post(url, {
				postText,
				postMedia,
				userId,
			});
			if (data) {
				setIsLoading(false);
				if (data.success) {
					fetchPosts(`${BaseURL}/post`);
					createNotification(
						userId,
						`${username} created a new post. Add your thoughts and reactions`,
						`/i/flow`
					);
					onClose();
					toast.success(data.msg);
				} else {
					toast.error(data.msg);
				}
			}
		} catch (error) {
			setIsLoading(false);
			toast.error("Something went wrong, try again later");
		}
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();
		submitPostDetails(`${BaseURL}/post`);
	};
	const handleFileInput = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			const result = reader.result;
			setPostMedia(result);
		};
	};
	const handleClickOutside = (event: any) => {
		if (pickerRef.current && !pickerRef.current.contains(event.target)) {
			setShowPicker(false);
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	const onEmojiClick = (emojiObject: Emoji) => {
		setPostText((prevInput) => prevInput + emojiObject.emoji);
	};

	return (
		<Modal onClose={onClose} isOpen={isOpen}>
			<div className="relative bg-slate-100 dark:bg-primary-200 ring-1 ring-inset ring-gray-700/50 w-full min-w-[100vw] xs:min-w-[350px] xs:w-[400px] sm:w-[500px] p-3 rounded-lg">
				<div className="p-3 border-b  border-slate-400 dark:border-gray-700">
					<h1 className="text-2xl text-center font-bold  text-slate-500 dark:text-light">
						Create a post
					</h1>
				</div>
				<div className="py-2 sm:p-2">
					<div className="flex items-center gap-2">
						<div className="bg-blue-base p-1 rounded-full">
							<img
								src={profileimage || placeholderAvatar}
								className="w-12 h-12  rounded-full"
							/>
						</div>
						<div className="flex flex-col items-start">
							<p className=" text-slate-500 dark:text-light font-semibold capitalize">{username}</p>
							<div className=" text-slate-500 text-sm dark:text-light bg-slate-300 dark:bg-gray-700 px-1 py-[1px] rounded-md flex items-center gap-1 cursor-pointer transition duration-100 active:bg-gray-600">
								<HiUsers sx={{ fontSize: 15 }} />
								Friends
							</div>
						</div>
					</div>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<textarea
							rows={7}
							onChange={(e) => setPostText(e.target.value)}
							value={postText}
							className={`w-full resize-none outline-none  bg-transparent text-2xl  text-slate-700 dark:text-light p-2 ${
								postMedia ? "h-20" : "h-40"
							}`}
							placeholder={`What's on your mind, ${username}?`}></textarea>
						{postMedia && (
							<img
								src={postMedia}
								className="my-3 w-full h-60 object-cover mx-auto rounded-lg"
							/>
						)}
						<div className="w-full border  border-slate-400 dark:border-gray-700 py-3 rounded-md flex items-center justify-between px-4">
							<p className=" text-slate-700 dark:text-light">Add to your post</p>
							<div className="flex gap-3">
								<label htmlFor="imagepost">
									<Image
										className="text-green-500 cursor-pointer"
										fontSize="large"
									/>
								</label>
								<input
									id="imagepost"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleFileInput}
								/>

								{utilIcons.map((icon, index) => (
									<span
										onClick={() => setShowPicker(true)}
										key={index}
										className={` cursor-pointer ${
											index == 0
												? "text-yellow-400"
												: index == 1
												? "text-sky-800"
												: " text-slat`e-700 dark:text-gray-600"
										}`}>
										{icon}
									</span>
								))}
							</div>
						</div>
						<Button
							type="submit"
							disabled={isLoading}
							sx={{
								backgroundImage:
									"linear-gradient(to right , #04477e , #791fe0  )",
								p: 1.5,
								color: "#d5d5d5",
								textTransform: "capitalize",
							}}
							className="text-white rounded-md transtition duration-75">
							{isLoading ? (
								<CircularProgress size={24} sx={{ color: "#f5f5f5" }} />
							) : (
								"Post"
							)}
						</Button>
					</form>
				</div>
				{showPicker && (
					<div ref={pickerRef} className="absolute -bottom-40 -right-40">
						<EmojiPicker onEmojiClick={onEmojiClick} theme={Theme.DARK} />
					</div>
				)}
			</div>
		</Modal>
	);
};

export default PostModal;
