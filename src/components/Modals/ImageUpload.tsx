import avatar from "../../assets/avatar.webp";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { useState } from "react";
interface Props {
	setProfileImageUpload: (value: any) => void;
	setUpload: (value: any) => void;
	upload: string;
}
const ImageUpload = ({ setProfileImageUpload, setUpload, upload }: Props) => {
	const [uploadImage, setUploadImage] = useState<any>("");
	const handleSubmitFile = () => {
		setUpload(uploadImage);
		setProfileImageUpload(false);
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
		<div
			onClick={() => setProfileImageUpload(false)}
			className="bg-gray-950/50 backdrop-blur-sm fixed top-0 right-0 left-0 bottom-0 h-screen w-full flex justify-center items-center z-[2]">
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, amount: 0.1 }}
				transition={{ duration: 0.4 }}
				variants={{
					hidden: { scale: 0.9, opacity: 0 },
					visible: { scale: 1, opacity: 1},
				}}
				onClick={(e) => e.stopPropagation()}
				className="relative bg-gray-950 w-[500px] rounded-xl flex flex-col items-center  p-8">
				<div
					onClick={() => setProfileImageUpload(false)}
					className="absolute text-light top-2 right-2 p-2 hover:bg-gray-800 transition duration-100 rounded-3xl cursor-pointer active:bg-gray-900">
					<CloseRounded />
				</div>
				<label
					htmlFor="upload"
					className="cursor-pointer bg-gradient-to-r from-sky-400 to-violet-700 absolute -top-28 rounded-full p-1.5">
					<div className="bg-gray-950 rounded-full p-1.5">
						<img
							src={uploadImage || upload || avatar}
							className="rounded-full w-40 h-40 object-cover"
						/>
					</div>
				</label>
				<div className="border-t border-gray-600 mt-16  pt-4 flex flex-col gap-4">
					<div className="flex flex-col gap-6">
						<p className="text-white text-center">
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
								width: "100%",
								p: 1.5,
								background: "rgb(40 , 88 , 158)",
								borderRadius: "50px",
								"&:hover": { background: "rgb(40 , 48 , 158)" },
								color: "white",
								textTransform: "capitalize",
							}}>
							Confirm upload
						</Button>
					</div>
					<p
						onClick={() => setProfileImageUpload(false)}
						className="text-center text-light underline cursor-pointer">
						Cancel
					</p>
					<p className="text-gray-400 text-center text-sm">
						It will be easier for your friends to recognise you if you upload
						your real photo. You can upload the image in JPG, GIF or PNG
						format
					</p>{" "}
				</div>
			</motion.div>
		</div>
	);
};

export default ImageUpload;
