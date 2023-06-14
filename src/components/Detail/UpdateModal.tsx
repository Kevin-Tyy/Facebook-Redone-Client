import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { UserInfo } from "../../types/Types";
import {
	CloseRounded,
	CameraAltRounded,
	// PersonOutlined,
	BookOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
	CastForEducation,
} from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

interface Props {
	setIsOpen: (value: any) => void;
}
const UpdateModal = ({ setIsOpen }: Props) => {
	const [loading, setLoading] = useState(false);
	const [newlocation, setlocation] = useState("");
	const [newwork, setwork] = useState("");
	const [newbio, setbio] = useState("");
	const [neweducation, seteducation] = useState("");
	const [newprofileimage, setprofileimage] = useState<any>("");
	const [bioinput, setbioinput] = useState(false);
	const [workinput, setworkinput] = useState(false);
	const [locationinput, setlocationinput] = useState(false);
	const [educationinput, seteducationinput] = useState(false);
	const {
		user: {
			userInfo: { profileimage, userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	// const handleChange = () => {};

	const submitInfo = async () => {
		setLoading(true);
		const { data } = await axios.put(`${BaseURL}/user/accounts/edit`, {
			userId: userId,
			profileimage: newprofileimage,
			bio: newbio,
			education: neweducation,
			location: newlocation,
			work: newwork,
		});
		console.log(data);
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
	const handleimage = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setprofileimage(reader?.result);
		};
	};
	return (
		<div
			onClick={() => setIsOpen(false)}
			className="h-screen w-full fixed top-0 bottom-0 right-0 left-0 bg-gray-900/50 backdrop-blur-sm  z-[20] flex justify-center items-center">
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative bg-primary-200 w-[550px] max-h-[1000px] overflow-y-scroll rounded-xl border border-gray-700 ">
				<div className="p-3 h-[70px] flex items-center justify-center border-b border-gray-700">
					<h1 className="text-center text-light text-2xl">Edit Profile</h1>
				</div>
				<div
					onClick={() => setIsOpen(false)}
					className="absolute top-4 right-4 bg-gray-700 text-white rounded-full p-1.5 cursor-pointer hover:bg-gray-800 active:bg-gray-600">
					<CloseRounded sx={{ fontSize: 25 }} />
				</div>
				<form onSubmit={handleSubmit}>
					<div className=" flex flex-col items-center gap-2 justify-center">
						<div className="bg-gradient-to-r from-sky-500 to-violet-800 p-1.5 rounded-full relative">
							<div className="bg-primary-200 p-1 rounded-full">
								<img
									src={newprofileimage ? newprofileimage : profileimage}
									className="w-[160px] h-[160px] rounded-full object-cover"
								/>
							</div>
							<label htmlFor="file">
								<CameraAltRounded
									sx={{ fontSize: 50 }}
									className="absolute right-0 top-32 bg-gray-900 p-2 text-light border border-gray-700 rounded-full cursor-pointer bottom-12 active:scale-95 hover:scale-105"
								/>
							</label>
							<input
								type="file"
								id="file"
								className="hidden"
								onChange={handleimage}
							/>
						</div>
						<p className="text-light text-lg font-thin">
							Click{" "}
							<label htmlFor="file" className="cursor-pointer font-black">
								here
							</label>{" "}
							to update your profile image{" "}
						</p>
					</div>
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
									<div className="flex gap-2 w-full bg-transparent outline outline-1 outline-gray-700 p-3 rounded-xl focus-within:outline-white/70">
										<BookOutlined className="text-white" />

										<textarea
											onChange={(e) => setbio(e.target.value)}
											className="w-full  outline-none bg-transparent text-white resize-none h-[100px]"
											placeholder="Update your bio (optional)"></textarea>
									</div>
									<span
										onClick={() => setbioinput(false)}
										className="bg-gray-700/50 p-2 text-white rounded-lg cursor-pointer">
										Cancel
									</span>
								</motion.div>
							)}
							<hr className="border-gray-700" />
							<div className="flex items-center justify-between">
								<label className="text-light">Location</label>
								<span
									onClick={() => setlocationinput(!locationinput)}
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
											onChange={(e) => setlocation(e.target.value)}
											placeholder={`Update your location (optional)`}
											className="w-full bg-transparent text-white outline-none"
										/>
									</div>
									<span
										onClick={() => setlocationinput(false)}
										className="bg-gray-700/50 p-2 text-white rounded-lg cursor-pointer">
										Cancel
									</span>
								</motion.div>
							)}
							<hr className="border-gray-700" />
							<div className="flex items-center justify-between">
								<label className="text-light">Work</label>
								<span
									onClick={() => setworkinput(!workinput)}
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
											onChange={(e) => setwork(e.target.value)}
											placeholder={`Update your work (optional)`}
											className="w-full bg-transparent text-white outline-none"
										/>
									</div>
									<span
										onClick={() => setworkinput(false)}
										className="bg-gray-700/50 p-2 text-white rounded-lg cursor-pointer">
										Cancel
									</span>
								</motion.div>
							)}

							<hr className="border-gray-700" />
							<div className="flex items-center justify-between">
								<label className="text-light">Education</label>
								<span
									onClick={() => seteducationinput(!educationinput)}
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
										<CastForEducation className="text-light" />
										<input
											onChange={(e) => seteducation(e.target.value)}
											type="text"
											placeholder={`Update your education profile (optional)`}
											className="w-full bg-transparent text-white outline-none"
										/>
									</div>
									<span
										onClick={() => seteducationinput(false)}
										className="bg-gray-700/50 p-2 text-white rounded-lg cursor-pointer">
										Cancel
									</span>
								</motion.div>
							)}
							<Button
								type="submit"
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
			<Toaster />
		</div>
	);
};

export default UpdateModal;
