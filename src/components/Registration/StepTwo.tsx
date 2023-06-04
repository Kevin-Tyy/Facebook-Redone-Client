import { FormData } from "../../types/Types";
import { VisibilityOutlined, VisibilityOffOutlined , KeyRounded , CallOutlined , PasswordOutlined } from "@mui/icons-material";
import { useState } from "react";

interface Props {
	formData: FormData;
	handleInputChange: (event: any) => void;
}


const StepTwo = ({ formData, handleInputChange }: Props) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [isPasswordConfVisible, setIsPasswordConfVisible] = useState<boolean>(false);

	setTimeout(()=> {
		setIsPasswordConfVisible(false)
	}, 5000)
	setTimeout(()=> {
		setIsPasswordVisible(false)
	}, 5000)

	return (
		<div className="flex flex-col gap-7">
			<div className="text-white flex items-center gap-3  p-3 bg-gray-800 rounded-full transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-500">
				<CallOutlined/>
				<input
					className="bg-transparent outline-none w-full placeholder:text-neutral-400"
					value={formData.phoneNumber}
					onChange={handleInputChange}
					placeholder="Phone number eg. (+91)"
					name="phoneNumber"
				/>
			</div>
			<div className="text-white flex items-center gap-3  p-3 bg-gray-800 rounded-full transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-500">
				<KeyRounded/>
				<input
					type={isPasswordVisible ? 'text' : 'password'}
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
			<div className="text-white flex items-center gap-3  p-3 bg-gray-800 rounded-full transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-500">
				<PasswordOutlined/>
				<input
					type={isPasswordConfVisible ? 'text' : 'password'}
					value={formData.passwordConf}
					onChange={handleInputChange}
					className="bg-transparent outline-none w-full placeholder:text-neutral-400"
					placeholder="Confirm password"
					name="passwordConf"
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						setIsPasswordConfVisible(!isPasswordConfVisible);
					}}>
					{isPasswordConfVisible ? (
						<VisibilityOffOutlined />
					) : (
						<VisibilityOutlined />
					)}
				</button>
			</div>
		</div>
	);
};

export default StepTwo;
