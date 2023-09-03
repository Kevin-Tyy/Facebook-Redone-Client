import React, { useEffect, useRef, useState } from "react";
import Modal from "../../../components/Modals";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import { Emoji, GroupType, UserInfo } from "../../../types/types";
import { BaseURL } from "../../../utils/Link";
import { toast } from "react-hot-toast";
import createNotification from "../../../api/functions/notifications";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import placeholderAvatar from "../../../assets/avatar.webp";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { AttachFile } from "@mui/icons-material";
import { HiUsers } from "react-icons/hi";
interface Props {
	isOpen: boolean;
	onClose: () => void;
	groupData: GroupType;
	fetchGroupData: () => void;
}
const GrpPostModal: React.FC<Props> = ({
	isOpen,
	onClose,
	groupData,
	fetchGroupData,
}) => {
	const [text, setText] = useState<string>("");
	const [media, setMedia] = useState<any>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const pickerRef = useRef<HTMLDivElement | null>(null);
	const { groupName, _id, groupMembers } = groupData;
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
				text: text,
				image: media,
				userId: userId,
				groupId: _id,
			});
			if (data) {
				setIsLoading(false);
				if (data.success) {
					fetchGroupData();
					createNotification(
						userId,
						`${username} shared a new post in a group you're in, ${groupName}. Add your thoughts and reactions`,
						`/group/${_id}`,

						groupMembers
							.filter((member) => member.userId !== userId)
							.map((member) => member._id)
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
		submitPostDetails(`${BaseURL}/groups/media`);
	};
	const handleFileInput = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			const result = reader.result;
			setMedia(result);
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
		setText((prevInput) => prevInput + emojiObject.emoji);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="relative bg-slate-100 dark:bg-primary-200 ring-1 ring-inset ring-gray-700/50 w-full min-w-[350px] xs:w-[400px] sm:w-[500px] p-3 rounded-lg">
				<div className="p-3 border-b  border-slate-400 dark:border-gray-700">
					<h1 className="text-2xl text-center font-bold  text-slate-500 dark:text-light">
						Create a post
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
							<p className=" text-slate-500 dark:text-light font-semibold capitalize">
								{username}
							</p>
							<div className=" text-slate-500 text-sm dark:text-light bg-slate-300 dark:bg-gray-700 px-1 py-[1px] rounded-md flex items-center gap-1 cursor-pointer transition duration-100 active:bg-gray-600">
								<HiUsers sx={{ fontSize: 15 }} />
								Group
							</div>
						</div>
					</div>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
						<textarea
							rows={7}
							onChange={(e) => setText(e.target.value)}
							value={text}
							className={`w-full resize-none rounded-lg outline-none  bg-transparent text-lg ring-1 ring-slate-700/20 text-slate-700 dark:text-light p-2 ${
								media ? "h-20" : "h-40"
							}`}
							placeholder={`Share your thoughts in the group..`}></textarea>
						{media && (
							<img
								src={media}
								className="my-3 w-full h-60 object-cover mx-auto rounded-lg"
							/>
						)}

						<div>
							<label htmlFor="imagepost" className="flex gap-2 cursor-pointer">
								<AttachFile sx={{ color: "#e1e1e1" }} />
								<p className="text-slate-600 dark:text-light">Attach files</p>
							</label>
							<input
								id="imagepost"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleFileInput}
							/>
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
							className="text-white rounded-md transtition duration-75 flex gap-4">
							{isLoading && (
								<CircularProgress size={20} sx={{ color: "#f5f5f5" }} />
							)}
							{isLoading ? "Processing..." : "Share"}
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

export default GrpPostModal;
