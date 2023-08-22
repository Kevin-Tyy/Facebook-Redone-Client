import { FormData } from "../../types/Types";
import { EmailOutlined, PersonOutlined } from "@mui/icons-material";
interface Props {
	formData: FormData;
	handleInputChange: (event: any) => void;
}

const StepOne = ({ formData, handleInputChange }: Props) => {
	return (
		<div className="flex flex-col gap-7">
			<div className="text-white w-full flex items-center gap-3  p-3 bg-gray-800 rounded-full transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-500">
				<PersonOutlined />
				<input
					value={formData.firstName}
					onChange={handleInputChange}
					className="bg-transparent outline-none w-full placeholder:text-neutral-400"
					placeholder="First name*"
					name="firstName"
				/>
			</div>
			<div className="text-white w-full flex items-center gap-3  p-3 bg-gray-800 rounded-full transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-500">
				<PersonOutlined />
				<input
					className="bg-transparent outline-none w-full placeholder:text-neutral-400"
					value={formData.lastName}
					onChange={handleInputChange}
					placeholder="Last name*"
					name="lastName"
				/>
			</div>
			
			<div className="text-white flex items-center gap-3  p-3 bg-gray-800 rounded-full transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-500">
				<EmailOutlined />
				<input
					className="bg-transparent outline-none w-full placeholder:text-neutral-400"
					value={formData.email}
					onChange={handleInputChange}
					placeholder="Email*"
					name="email"
				/>
			</div>
		</div>
	);
};

export default StepOne;
