import { motion } from "framer-motion";
import { CameraAltRounded, CloseRounded } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser, updateImage } from "../../redux/features/AuthSlice";
import { UserInfo } from "../../types/Types";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import { Toaster, toast } from "react-hot-toast";
interface Props {
	setImageUpdate: (value: any) => void;
}

const ImageUpdate = ({ setImageUpdate }: Props) => {
	const dispatch = useDispatch();
	const [uploadImage, setUploadImage] = useState<any>("");
	const [loading, setLoading] = useState(false);
	const serverSubmit = async () => {
		setLoading(true);
		const { data } = await axios.patch(
			`${BaseURL}/user/accounts/edit/profileimage`,
			{
				userId: userId,
				profileimage: uploadImage,
			}
		);
		if (data) {
			setLoading(false);
		}
		if (data?.success) {
			toast.success(data?.msg);
			dispatch(updateImage(data?.userInfo?.profileimage));
			setLoading(false);
		} else {
			toast.error(data?.msg);
			setLoading(false);
		}
	};
	const handleSubmitFile = (e: any) => {
		e.preventDefault();
		serverSubmit();
	};
	const handleInputChange = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setUploadImage(reader.result);
		};
	};
	const {
		user: {
			userInfo: { profileimage, userId },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: UserInfo } };
	return (
		<div
			className="h-screen w-full fixed top-0 bottom-0 right-0 left-0 bg-gray-900/50 backdrop-blur-sm z-[20] flex justify-center items-center"
			onClick={() => setImageUpdate(false)}>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, amount: 0.1 }}
				transition={{ duration: 0.1 }}
				variants={{
					hidden: { opacity: 0, y: -20 },
					visible: { opacity: 1, y: 0 },
				}}
				onClick={(e) => e.stopPropagation()}
				className="relative bg-primary-200 ring-1 ring-gray-700 w-[500px] rounded-xl flex flex-col items-center  p-8">
				<div
					onClick={() => setImageUpdate(false)}
					className="absolute text-light top-2 right-2 p-2 hover:bg-gray-800 transition duration-100 rounded-3xl cursor-pointer active:bg-gray-900">
					<CloseRounded />
				</div>
				<div className="bg-gradient-to-r from-sky-400 to-violet-700 absolute -top-28 rounded-full p-1.5">
					<div className="bg-gray-950 rounded-full p-1.5">
						<img
							src={uploadImage ? uploadImage : profileimage}
							className="rounded-full w-40 h-40 object-cover"
						/>
					</div>
					<label htmlFor="upload">
						<CameraAltRounded
							sx={{ fontSize: 50 }}
							className="absolute right-0 top-32 bg-gray-900 p-2 text-light border border-gray-700 rounded-full cursor-pointer bottom-12 active:scale-95 hover:scale-105"
						/>
					</label>
				</div>
				<div className="border-t border-gray-600 mt-16  pt-4 flex flex-col gap-4">
					<p className="text-light text-lg font-thin text-center">
						Click{" "}
						<label htmlFor="upload" className="cursor-pointer font-black">
							here
						</label>{" "}
						to update your profile image{" "}
					</p>
					<p className="text-light text-center text-sm">
						It will be easier for your friends to recognise you if you upload
						your real photos to. You can upload the image in JPG, GIF or PNG
						format
					</p>
					<form>
						<div className="flex flex-col gap-6">
							<label
								htmlFor="upload"
								className="border border-light flex justify-center text-white p-3 rounded-full cursor-pointer transition hover:bg-gray-800/30 active:bg-gray-900/40">
								{uploadImage ? "Change photo" : "Upload photo"}
							</label>
							<input
								id="upload"
								type="file"
								className="hidden"
								onChange={handleInputChange}
								name="upload"
							/>
							<Button
								onClick={handleSubmitFile}
								type="submit"
								sx={{
									width: "100%",
									p: 1.5,
									background: "rgb(40 , 88 , 158)",
									borderRadius: "50px",
									"&:hover": { background: "rgb(40 , 48 , 158)" },
									color: "white",
									textTransform: "capitalize",
								}}>
								{loading ? (
									<CircularProgress size={20} sx={{ color: "#fff" }} />
								) : (
									"Upload Image"
								)}
							</Button>
						</div>
					</form>
					<p
						onClick={() => setImageUpdate(false)}
						className="text-center text-light underline cursor-pointer">
						Cancel
					</p>
				</div>
			</motion.div>
			<Toaster />
		</div>
	);
};

export default ImageUpdate;
