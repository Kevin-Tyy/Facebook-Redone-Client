import { Userdata } from "../../../types/types";
import placeholderImage from "../../../assets/avatar.webp";
import { CameraAltRounded } from "@mui/icons-material";
import React from "react";

interface ImageProps {
	setPreviewImage: (value: any) => void;
	setViewImage: (value: any) => void;
	userData: Userdata;
	setImageUpdate: (value: any) => void;
	userId: string;
}
const Image: React.FC<ImageProps> = ({
	userData,
	setImageUpdate,
	setPreviewImage,
	setViewImage,
	userId,
}) => {
	return (
		<div className="bg-gradient-to-r from-violet-800 to-sky-500 rounded-full p-[5px]">
			<div className="bg-black rounded-full p-[5px]">
				<img
					onClick={() => {
						setPreviewImage(userData?.profileimage as string);
						setViewImage(true);
					}}
					src={
						userData?.profileimage ? userData?.profileimage : placeholderImage
					}
					className="w-44 h-44 rounded-full object-cover cursor-pointer"
				/>
			</div>
			{userData?.userId == userId && (
				<CameraAltRounded
					onClick={() => setImageUpdate(true)}
					sx={{ fontSize: 50 }}
					className="absolute right-0 top-36 bg-gray-900 p-2 text-light border border-gray-700 rounded-full cursor-pointer bottom-12 active:scale-95 hover:scale-105"
				/>
			)}
		</div>
	);
};

export default Image;
