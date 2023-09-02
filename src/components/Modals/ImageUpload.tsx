import avatar from "../../assets/avatar.webp";
import { Button } from "@mui/material";
import { useState } from "react";
import Modal from ".";
import { toast } from "react-hot-toast";
interface Props {
	setUpload: (value: any) => void;
	upload: string;
	isOpen: boolean;
	onClose: () => void;
}
const ImageUpload = ({
	setUpload,
	upload,
	onClose,
	isOpen,
}: Props) => {
	const [uploadImage, setUploadImage] = useState<any>("");
	const handleSubmitFile = () => {
		if (uploadImage) {
			setUpload(uploadImage);
			onClose();
		}else{
			toast.error('Please select a file, otherwise click cancel button')
		}
		
	};
	const handleInputChange = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setUploadImage(reader.result);
		};
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="relative bg-slate-200  dark:bg-primary-200 w-[500px] rounded-xl flex flex-col items-center ring-1 ring-slate-300 dark:ring-primary-100 p-8">
				<label
					htmlFor="upload"
					className="cursor-pointer bg-gradient-to-r from-sky-400 to-violet-700 absolute -top-28 rounded-full p-1.5">
					<div className="bg-slate-300 dark:bg-background-primary rounded-full p-1.5">
						<img
							src={uploadImage || upload || avatar}
							className="rounded-full w-40 h-40 object-cover"
						/>
					</div>
				</label>
				<div className="border-t border-slate-400 dark:border-gray-600 mt-16  pt-4 flex flex-col gap-4">
					<div className="flex flex-col gap-6">
						<p className="text-slate-700 dark:text-white text-center">
							Click{" "}
							<label
								htmlFor="upload"
								className="hover:underline text-lg cursor-pointer font-bold">
								here
							</label>{" "}
							to upload a new image from your device
						</p>
						<input
							id="upload"
							type="file"
							className="hidden"
							accept="image/*"
							onChange={handleInputChange}
							name="upload"
						/>
						<Button
							onClick={handleSubmitFile}
							type="submit"
							sx={{
								width: "80%",
								mx : 'auto',
								p: 1.5,
								backgroundColor: "#0C88EF",
								borderRadius: "10px",
								"&:hover": { backgroundColor: "#3293e3" },
								color: "white",
								textTransform: "capitalize",
							}}>
							Confirm upload
						</Button>
					</div>
					<p
						onClick={onClose}
						className="text-center text-slate-700 dark:text-light underline cursor-pointer">
						Cancel
					</p>
					<p className="text-slate-500 dark:text-gray-400 text-center text-sm">
						It will be easier for your friends to recognise you if you upload
						your real photo. You can upload the image in JPG, GIF or PNG format
					</p>{" "}
				</div>
			</div>
		</Modal>
	);
};

export default ImageUpload;
