import { useState, useEffect, useRef } from "react";
import {
	PeopleAltRounded,
	EmojiEmotionsOutlined,
	GifBoxRounded,
	MoreHoriz,
} from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { Emoji, UserInfo } from "../../types/types";
import EmojiPicker, { Theme } from "emoji-picker-react";
import placeholderAvatar from "../../assets/avatar.webp";
import Modal from ".";
import createNotification from "../../api/func/notifications";
interface Props {
	onClose: () => void;
	isOpen: boolean;
}

const utilIcons = [
	<EmojiEmotionsOutlined fontSize="large" />,
	<GifBoxRounded fontSize="large" />,
	<MoreHoriz fontSize="large" />,
];
const StoryModal = ({ onClose, isOpen }: Props) => {
	const [storyCaption, setStoryCaption] = useState<string>("");
	const [storyMedia, setStoryMedia] = useState<any>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPicker, setShowPicker] = useState<boolean>(false);

	const {
		user: {
			userInfo: { userId, profileimage, username },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const pickerRef = useRef<HTMLDivElement | null>(null);

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
		setStoryCaption((prevInput) => prevInput + emojiObject.emoji);
	};
	const submitPostDetails = async (url: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.post(url, {
				storyCaption,
				storyMedia,
				userId,
			});
			if (data) {
				setIsLoading(false);
				if (data.success) {
					toast.success(data.msg);
					createNotification(
						userId,
						`${username} added to their story.Tap to view`,
						`/i/flow`
					);
					onClose();
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
		submitPostDetails(`${BaseURL}/stories`);
	};

	const handleFileInput = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			const result = reader.result;
			setStoryMedia(result);
		};
	};

	return (
		<Modal onClose={onClose} isOpen={isOpen}>
			<div className="relative bg-primary-200  ring-1 ring-inset ring-gray-700/50  w-full min-w-[350px] xs:w-[400px] sm:w-[500px] p-3 rounded-lg">
				<div className="p-3 border-b border-gray-700">
					<h1 className="text-2xl text-center font-bold text-light">
						Add to your story
					</h1>
				</div>
				<div className="p-2">
					<div className="flex items-center gap-2">
						<div className="bg-blue-base p-1 rounded-full">
							<img
								src={profileimage || placeholderAvatar}
								className="w-12 h-12  rounded-full"
							/>
						</div>
						<div className="flex flex-col items-start">
							<p className="text-light font-semibold capitalize">{username}</p>
							<div className="text-light bg-gray-700 px-1 py-[1px] rounded-md flex items-center gap-1 cursor-pointer transition duration-100 active:bg-gray-600">
								<PeopleAltRounded sx={{ fontSize: 15 }} />
								Friends
							</div>
						</div>
					</div>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<label
							htmlFor="imagepost"
							className="flex flex-col items-center justify-center h-96 border border-dashed rounded-md cursor-pointer border-gray-700 my-3">
							{storyMedia ? (
								<img
									src={storyMedia}
									className="my-3 w-full max-w-[80%] h-72 object-cover mx-auto rounded-lg"
								/>
							) : (
								<p className="text-light text-lg">Click or drag and drop </p>
							)}
							{storyMedia && (
								<p className="text-light bg-primary-100 py-1 px-2 rounded-full">
									Change image
								</p>
							)}
						</label>
						<input
							id="imagepost"
							type="file"
							accept="image/*"
							className="hidden"
							onChange={handleFileInput}
						/>

						<div className="w-full border border-gray-700 py-3 rounded-md flex items-center justify-between px-4">
							<input
								onChange={(e) => setStoryCaption(e.target.value)}
								type="text"
								value={storyCaption}
								placeholder="Add a caption"
								className="text-light bg-transparent outline-none w-full"
							/>
							<div className="flex gap-3">
								{utilIcons.map((icon, index) => (
									<span
										onClick={() => setShowPicker(true)}
										key={index}
										className={`cursor-pointer ${
											index == 0
												? "text-yellow-400"
												: index == 1
												? "text-sky-800"
												: "text-gray-600"
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
								p: 2,
								color: "#d5d5d5",
								textTransform: "capitalize",
							}}
							className="text-white rounded-md transtition duration-75">
							{isLoading ? (
								<CircularProgress size={20} sx={{ color: "#f5f5f5" }} />
							) : (
								"Post story"
							)}
						</Button>
					</form>
				</div>
			</div>
			{showPicker && (
				<div ref={pickerRef} className="absolute -bottom-20 -right-20">
					<EmojiPicker onEmojiClick={onEmojiClick} theme={Theme.AUTO} />
				</div>
			)}
		</Modal>
	);
};

export default StoryModal;
