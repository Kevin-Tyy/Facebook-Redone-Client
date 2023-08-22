import { FormData } from "../../types/Types";
import {
	VisibilityOutlined,
	VisibilityOffOutlined,
	KeyRounded,
	Check,
	PersonOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import ImageUpload from "../Modals/ImageUpload";

interface Props {
	formData: FormData;
	handleInputChange: (event: any) => void;
	setProfileImage: (event: any) => void;
}

const StepTwo = ({ formData, handleInputChange, setProfileImage }: Props) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [profileImageUpload, setProfileImageUpload] = useState<boolean>(false);
	const [upload, setUpload] = useState<string>("");

	useEffect(() => {
		setProfileImage(upload);
	}, [upload]);	
	return (
		<div className="flex flex-col gap-7">
			<div className="text-white flex items-center gap-3  p-3 bg-gray-800 rounded-full transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-500">
				<PersonOutlined />
				<input
					value={formData.username}
					onChange={handleInputChange}
					className="bg-transparent outline-none w-full placeholder:text-neutral-400"
					placeholder="Username"
					name="username"
				/>
			</div>
			<div className="text-white flex items-center gap-3  p-3 bg-gray-800 rounded-full transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-500">
				<KeyRounded />
				<input
					type={isPasswordVisible ? "text" : "password"}
					value={formData.password}
					onChange={handleInputChange}
					className="bg-transparent outline-none w-full placeholder:text-neutral-400"
					placeholder="Password"
					name="password"
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						setIsPasswordVisible(!isPasswordVisible);
					}}>
					{isPasswordVisible ? (
						<VisibilityOffOutlined />
					) : (
						<VisibilityOutlined />
					)}
				</button>
			</div>
			<div
				onClick={() => setProfileImageUpload(true)}
				className="w-full text-white border border-gray-600 p-3 rounded-full flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-950/30">
				{upload && <Check htmlColor="#00ff00" />}
				{upload ? "Change image" : "Upload image"}
			</div>
			{profileImageUpload && (
				<ImageUpload
					setProfileImageUpload={setProfileImageUpload}
					setUpload={setUpload}
					upload={upload}
				/>
			)}
		</div>
	);
};

export default StepTwo;
