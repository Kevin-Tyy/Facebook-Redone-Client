import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { Emoji, UserInfo } from "../../types/Types";
import {
	BookOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
	EmojiEmotionsOutlined,
	SchoolOutlined,
} from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import EmojiPicker, { Theme } from "emoji-picker-react";
import Modal from "../Modals";

interface Props {
	onClose: () => void;
	isOpen: boolean;
}
const UpdateModal = ({ onClose, isOpen }: Props) => {
	const {
		user: {
			userInfo: { userId, bio, work, location, education },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const [loading, setLoading] = useState(false);
	const [newbio, setbio] = useState(bio);
	const [bioinput, setbioinput] = useState(false);
	const [workinput, setworkinput] = useState(false);
	const [locationinput, setlocationinput] = useState(false);
	const [educationinput, seteducationinput] = useState(false);
	const [newInfo, setNewInfo] = useState({
		work: work,
		bio: bio,
		education: education,
		location: location,
	});
	const handleChange = (e: any) => {
		setNewInfo((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};
	const submitInfo = async () => {
		setLoading(true);
		const { data } = await axios.patch(`${BaseURL}/user/accounts/edit`, {
			...newInfo,
			bio: newbio,
			userId: userId,
		});

		if (loading) {
			toast.loading("Loading...");
		}
		if (data) {
			if (data.success) {
				toast.success(data.msg);
				setLoading(false);
			} else {
				toast.error(data.msg);
				setLoading(false);
			}
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		submitInfo();
	};

	const [showPicker, setShowPicker] = useState(false);
	const pickerRef = useRef<HTMLDivElement | null>(null);
	const onEmojiClick = (emojiObj: Emoji) => {
		setbio((prev) => prev + emojiObj.emoji);
	};
	const handleOutsideClick = (e: any) => {
		if (pickerRef.current && !pickerRef.current.contains(e.target)) {
			setShowPicker(false);
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.addEventListener("mousedown", handleOutsideClick);
		};
	});
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="relative bg-primary-200 w-[450px] md:w-[550px] max-h-[1000px]  rounded-xl border border-gray-700 ">
				<div className="p-3 h-[70px] flex items-center justify-center border-b border-gray-700">
					<h1 className="text-center text-light text-2xl">Edit Profile</h1>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="p-5">
						<div className="flex flex-col gap-4">
							<div className="flex gap-3"></div>
							<div className="flex items-center justify-between">
								<label className="text-light">Bio</label>
								<span
									onClick={() => setbioinput(!bioinput)}
									className="rounded-full text-light px-6 py-2 cursor-pointer active:scale-95 transition hover:bg-gray-800/50">
									{bioinput ? "Discard" : "Edit"}
								</span>
							</div>
							{bioinput && (
								<motion.div
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, amount: 0.1 }}
									transition={{ duration: 0.2 }}
									variants={{
										hidden: { opacity: 0, y: -30 },
										visible: { opacity: 1, y: 0 },
									}}
									className="flex items-center gap-2">
									<div className="relative flex gap-2 w-full bg-transparent outline outline-1 outline-gray-700 p-3 rounded-xl focus-within:outline-white/70">
										<BookOutlined className="text-white" />

										<textarea
											onChange={(e) => setbio(e.target.value)}
											value={newbio}
											className="w-full  outline-none bg-transparent text-white resize-none h-[100px]"
											placeholder="Update your bio (optional)"></textarea>
										<div
											className="cursor-pointer text-white absolute bottom-1 right-1 hover:bg-gray-600/40 rounded-full p-1"
											onClick={() => setShowPicker(true)}>
											<EmojiEmotionsOutlined />
										</div>
									</div>
									<span
										onClick={() => setbioinput(false)}
										className="bg-red-600/10 ring-1 ring-red-600 hover:bg-red-600/20 transition p-2 text-white rounded-lg cursor-pointer">
										Cancel
									</span>
								</motion.div>
							)}
							<hr className="border-gray-700" />
							<div className="flex items-center justify-between">
								<label className="text-light">Location</label>
								<span
									onClick={() => {
										setlocationinput(!locationinput);
										!newbio && setbioinput(false);
										!work && setworkinput(false);
										!education && seteducationinput(false);
									}}
									className="rounded-full text-light px-6 py-2 cursor-pointer active:scale-95 transition hover:bg-gray-800/50">
									{locationinput ? "Discard" : "Edit"}
								</span>
							</div>

							{locationinput && (
								<motion.div
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, amount: 0.1 }}
									transition={{ duration: 0.2 }}
									variants={{
										hidden: { opacity: 0, y: -30 },
										visible: { opacity: 1, y: 0 },
									}}
									className="flex items-center gap-2">
									<div className="flex gap-2 w-full bg-transparent outline outline-1 outline-gray-700 p-3 rounded-xl focus-within:outline-white/70">
										<LocationOnOutlined className="text-light" />
										<input
											type="text"
											name="location"
											onChange={handleChange}
											placeholder={`Update your location (optional)`}
											className="w-full bg-transparent text-white outline-none"
											value={location}
										/>
									</div>
									<span
										onClick={() => setlocationinput(false)}
										className="bg-red-600/10 ring-1 ring-red-600 hover:bg-red-600/20 transition p-2 text-white rounded-lg cursor-pointer">
										Cancel
									</span>
								</motion.div>
							)}
							<hr className="border-gray-700" />
							<div className="flex items-center justify-between">
								<label className="text-light">Work</label>
								<span
									onClick={() => {
										setworkinput(!workinput);
										!newbio && setbioinput(false);
										!education && seteducationinput(false);
										!location && setlocationinput(false);
									}}
									className="rounded-full text-light px-6 py-2 cursor-pointer active:scale-95 transition hover:bg-gray-800/50">
									{workinput ? "Discard" : "Edit"}
								</span>
							</div>
							{workinput && (
								<motion.div
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, amount: 0.1 }}
									transition={{ duration: 0.2 }}
									variants={{
										hidden: { opacity: 0, y: -30 },
										visible: { opacity: 1, y: 0 },
									}}
									className="flex items-center gap-2">
									<div className="flex gap-2 w-full bg-transparent outline outline-1 outline-gray-700 p-3 rounded-xl focus-within:outline-white/70">
										<WorkOutlineOutlined className="text-light" />
										<input
											type="text"
											name="work"
											onChange={handleChange}
											placeholder={`Update your work (optional)`}
											className="w-full bg-transparent text-white outline-none"
											value={work}
										/>
									</div>
									<span
										onClick={() => setworkinput(false)}
										className="bg-red-600/10 ring-1 ring-red-600 hover:bg-red-600/20 transition p-2 text-white rounded-lg cursor-pointer">
										Cancel
									</span>
								</motion.div>
							)}

							<hr className="border-gray-700" />
							<div className="flex items-center justify-between">
								<label className="text-light">Education</label>
								<span
									onClick={() => {
										seteducationinput(!educationinput);
										!newbio && setbioinput(false);
										!work && setworkinput(false);
										!location && setlocationinput(false);
									}}
									className="rounded-full text-light px-6 py-2 cursor-pointer active:scale-95 transition hover:bg-gray-800/50">
									{educationinput ? "Discard" : "Edit"}
								</span>
							</div>
							{educationinput && (
								<motion.div
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, amount: 0.1 }}
									transition={{ duration: 0.2 }}
									variants={{
										hidden: { opacity: 0, y: -30 },
										visible: { opacity: 1, y: 0 },
									}}
									className="flex items-center gap-2">
									<div className="flex gap-2 w-full bg-transparent outline outline-1 outline-gray-700 p-3 rounded-xl focus-within:outline-white/70">
										<SchoolOutlined className="text-light" />
										<input
											onChange={handleChange}
											type="text"
											name="education"
											placeholder={`Update your education profile (optional)`}
											className="w-full bg-transparent text-white outline-none"
											value={education}
										/>
									</div>
									<span
										onClick={() => seteducationinput(false)}
										className="bg-red-600/10 ring-1 ring-red-600 hover:bg-red-600/20 transition p-2 text-white rounded-lg cursor-pointer">
										Cancel
									</span>
								</motion.div>
							)}
							<Button
								type={"submit"}
								disabled={loading}
								sx={{
									color: "white",
									background: " linear-gradient(to right, #0a5796 , #8c00ff)",
									"&:hover": {
										background: " linear-gradient(to right, #0a5796 , #8c00ff)",
									},
									textTransform: "capitalize",
									px: 2,
									py: 1,
									p: 1.7,
									mb: 2,
									borderRadius: "10px",
									display: "flex",
									whiteSpace: "nowrap",
									gap: "5px",
									width: "100%",
								}}>
								{loading ? (
									<CircularProgress size={20} sx={{ color: "#fff" }} />
								) : (
									"Save new info"
								)}
							</Button>
						</div>
					</div>
				</form>
			</div>
			{showPicker && (
				<div ref={pickerRef} className="absolute -bottom-20 md:-right-40">
					<EmojiPicker onEmojiClick={onEmojiClick} theme={Theme.AUTO} />
				</div>
			)}
		</Modal>
	);
};

export default UpdateModal;
