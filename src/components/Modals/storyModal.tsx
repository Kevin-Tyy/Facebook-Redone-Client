import { useState, useEffect, useRef } from "react";
import {
	CloseRounded,
	PeopleAltRounded,
	EmojiEmotionsOutlined,
	GifBoxRounded,
	MoreHoriz,
} from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { Emoji, UserInfo } from "../../types/Types";
import EmojiPicker from "emoji-picker-react";
interface Props {
	handleStoryToggle: (value: any) => void;
}

const utilIcons = [
	<EmojiEmotionsOutlined fontSize="large" />,
	<GifBoxRounded fontSize="large" />,
	<MoreHoriz fontSize="large" />,
];
const StoryModal = ({ handleStoryToggle }: Props) => {
	const [storyCaption, setStoryCaption] = useState<string | null>("");
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
	const pickerRef = useRef(null);

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
			console.log(data);
			if (data) {
				setIsLoading(false);
				if (data.success) {
					toast.success(data.msg);
				} else {
					toast.error(data.msg);
				}
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
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
		<div
			className="backdrop-blur-sm bg-gray-950/50 h-screen w-full fixed top-0 right-0 bottom-0 left-0 z-[10] flex justify-center items-center "
			onClick={() => handleStoryToggle(false)}>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, amount: 0.1 }}
				transition={{ duration: 0.15, delay: 0.2 }}
				variants={{
					hidden: { opacity: 0, y: -30 },
					visible: { opacity: 1, y: 0 },
				}}
				onClick={(e) => e.stopPropagation()}
				className="relative bg-primary-200 w-full  max-w-[550px] p-3 rounded-lg ">
				<div className="p-3 border-b border-gray-700">
					<h1 className="text-2xl text-center font-bold text-light">
						Add to your story
					</h1>

					<div
						onClick={() => handleStoryToggle(false)}
						className="hover:bg-gray-700 rounded-full p-1.5 absolute top-5 right-3 cursor-pointer ">
						<CloseRounded sx={{ color: "#fff" }} />
					</div>
				</div>
				<div className="p-2">
					<div className="flex items-center gap-2">
						<div className="bg-primary-100 p-1 rounded-full">
							<div className="bg-primary-200 p-1 rounded-full">
								<img src={profileimage} className="w-12 h-12  rounded-full" />
							</div>
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
							accept="*"
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
				{showPicker && (
					<div
						ref={pickerRef}
						className="absolute -bottom-20 -right-20">
						<EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
					</div>
				)}
				<Toaster />
			</motion.div>
		</div>
	);
};

export default StoryModal;
