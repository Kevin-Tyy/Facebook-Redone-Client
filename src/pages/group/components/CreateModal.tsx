import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import clsx from "clsx";
import { BaseURL } from "../../../utils/Link";
import Modal from "../../../components/Modals";
import { UserInfo } from "../../../types/types";
import { HiUserGroup } from "react-icons/hi2";
import createNotification from "../../../api/functions/notifications";
interface CreateModalProps {
	onClose: () => void;
	isOpen: boolean;
	fetchGroups: () => void;
}
const CreateModal = ({ onClose, isOpen, fetchGroups }: CreateModalProps) => {
	const [loading, setLoading] = useState(false);
	const [previewImage, setPreviewImage] = useState<any>(null);
	const {
		user: {
			userInfo: { userId, username },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const [formData, setFormData] = useState({
		groupName: "",
		groupDescription: "",
	});

	const handleImageUpload = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			const result = reader.result;
			setPreviewImage(result);
		};
	};
	const onSubmit = (e: any) => {
		e.preventDefault();
		setLoading(true);
		axios
			.post(`${BaseURL}/groups`, {
				...formData,
				userId,
				groupImage: previewImage,
			})
			.then((response: AxiosResponse) => {
				toast.success(response.data.msg);
				fetchGroups();
				createNotification(
					userId,
					`${username} created a group you might be interested in.${formData.groupName}`,
					`/i/groups`
				);
				onClose();
			})
			.catch((error) => {
				if (error.response) {
					toast.error(error?.response?.data?.msg);
				} else {
					toast.error("Something went wrong");
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const handleInputChange = (e: any) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="bg-slate-200 dark:bg-primary-200 p-5 w-[500px] rounded-lg">
				<div className="space-y-4">
					<div className="border-b border-slate-400 dark:border-gray-700 pb-3">
						<h1 className="text-xl  text-slate-700 dark:text-white text-center">Create a group</h1>
					</div>
					<form onSubmit={onSubmit} className="">
						<div className="flex gap-4">
							<label htmlFor="groupImage" className="h-44 w-44 group relative">
								{previewImage ? (
									<img
										src={previewImage}
										className="h-44 w-44 object-cover ring-1 ring-gray-800 rounded-sm"
									/>
								) : (
									<div className="h-44 w-44 bg-gradient-to-br from-blue-700 rounded-md to-gray-500 shadow flex items-center justify-center">
										<HiUserGroup size={40} className="text-white" />
									</div>
								)}
								<div className="absolute inset-0 bg-white dark:bg-black opacity-0 rounded-md group-hover:bg-white/30  dark:group-hover:bg-black/70 group-hover:opacity-100 z-10 flex flex-col items-center justify-center text-white cursor-pointer transition">
									<BiPencil size={35} />
									<p className="text-sm">
										{previewImage ? "Change" : "Choose"} photo
									</p>
								</div>
							</label>
							<input
								type="file"
								id="groupImage"
								className="hidden"
								accept="image/*"
								onChange={handleImageUpload}
								disabled={loading}
							/>
							<div className="flex-1 space-y-3 flex flex-col items-end">
								<input
									placeholder="Group name *"
									name="groupName"
									onChange={handleInputChange}
									disabled={loading}
									required
									type="text"
									className={clsx(
										"bg-slate-400 dark:bg-primary-100 text-xs w-full p-3  text-slate-700 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 outline-none rounded-md focus:ring-1 focus:ring-inset focus:ring-gray-500",
										loading && "opacity-60"
									)}
								/>
								<textarea
									className={clsx(
										"h-32 resize-none bg-slate-400 dark:bg-primary-100 w-full p-3  text-slate-700 dark:text-white outline-none rounded-md focus:ring-1 placeholder:text-gray-600 focus:ring-inset focus:ring-gray-500 text-xs dark:placeholder:text-gray-400",
										loading && "opacity-60"
									)}
									onChange={handleInputChange}
									name="groupDescription"
									required
									disabled={loading}
									placeholder="Add a group description *"></textarea>
								<button
									disabled={loading}
									type="submit"
									className={clsx(
										"button text-white dark:text-black w-28 py-3 rounded-full text-sm font-bold flex justify-center items-center",
										loading && "opacity-60"
									)}>
									Create
								</button>
							</div>
						</div>
					</form>
					<p className="text-[10px] text-gray-400">
						By proceeding, you agree to give us access to the image you choose
						to upload. Please make sure you have the right to upload the image.
					</p>
				</div>
			</div>
		</Modal>
	);
};

export default CreateModal;
