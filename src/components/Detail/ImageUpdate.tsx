import { CameraAltRounded } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { UserInfo } from "../../types/types";
import placeholderAvatar from "../../assets/avatar.webp";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import { toast } from "react-hot-toast";
import Modal from "../Modals";
interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const ImageUpdate = ({ isOpen, onClose }: Props) => {
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
		<Modal onClose={onClose} isOpen={isOpen}>
			<div className="relative bg-slate-200 dark:bg-primary-200 ring-1 ring-slate-400 dark:ring-gray-700 w-full sm:w-[500px] rounded-xl flex flex-col items-center  p-8">
				<div className="bg-gradient-to-r from-sky-400 to-violet-700 absolute -top-28 rounded-full p-1.5">
					<div className="bg-gray-950 rounded-full p-1.5">
						<img
							src={uploadImage || profileimage || placeholderAvatar}
							className="rounded-full w-40 h-40 object-cover"
						/>
					</div>
					<label htmlFor="upload">
						<CameraAltRounded
							sx={{ fontSize: 50 }}
							className="absolute right-0 top-32 bg-slate-300 dark:bg-gray-900 p-2 text-white dark:text-light border border-gray-400 dark:border-gray-700 rounded-full cursor-pointer bottom-12 active:scale-95 hover:scale-105"
						/>
					</label>
				</div>
				<div className="border-t border-gray-400 dark:border-gray-600 mt-16  pt-4 flex flex-col gap-4">
					<p className=" text-slate-700 dark:text-light text-lg font-thin text-center">
						Click{" "}
						<label htmlFor="upload" className="cursor-pointer font-black">
							here
						</label>{" "}
						to update your profile image{" "}
					</p>
					<p className=" text-slate-700 dark:text-light text-center text-sm">
						It will be easier for your friends to recognise you if you upload
						your real photos to. You can upload the image in JPG, GIF or PNG
						format
					</p>
					<form>
						<div className="flex flex-col gap-6">
							<label
								htmlFor="upload"
								className="border  border-slate-500  flex justify-center  text-slate-700 dark:text-white p-3 rounded-full cursor-pointer transition  hover:bg-slate-300 dark:hover:bg-primary-100/30 active:bg-primary-100/40">
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
									background: "rgb(40 , 78 , 158)",
									borderRadius: "50px",
									"&:hover": { background: "rgb(40 , 98 , 158)" },
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
						onClick={onClose}
						className="text-center  text-slate-700 dark:text-light underline cursor-pointer">
						Cancel
					</p>
				</div>
			</div>
		</Modal>
	);
};

export default ImageUpdate;
