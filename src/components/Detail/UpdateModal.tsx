import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { UserInfo } from "../../types/Types";
import {
	CloseRounded,
	CameraAltRounded,
	PersonOutlined,
	BookOutlined,
	EmailOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  CastForEducation,
} from "@mui/icons-material";

interface Props {
	setIsOpen: (value: any) => void;
}
const UpdateModal = ({ setIsOpen }: Props) => {
	const {
		user: {
			userInfo: { profileimage, email, firstname, lastname, username },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
  const handleChange = () => {
    
  } 
  const handleSubmit = (e : any) => {
    e.prevenDefault()
    
  }
	return (
		<div
			onClick={() => setIsOpen(false)}
			className="h-screen w-full fixed top-0 bottom-0 right-0 left-0 bg-gray-900/50 backdrop-blur-sm  z-[20] flex justify-center items-center">
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative bg-primary-200 w-[550px] max-h-[1000px] overflow-y-scroll rounded-lg border border-gray-700 ">
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
									src={profileimage}
									className="w-[160px] h-[160px] rounded-full object-cover"
								/>
							</div>
							<label htmlFor="file">
								<CameraAltRounded
									sx={{ fontSize: 50 }}
									className="absolute right-0 top-32 bg-gray-900 p-2 text-light border border-gray-700 rounded-full cursor-pointer bottom-12 active:scale-95 hover:scale-105"
								/>
							</label>
							<input type="file" id="file" className="hidden" />
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
							<div className="flex gap-3">
								<div className="flex gap-2 w-full bg-transparent outline outline-1 outline-gray-700 p-3 rounded-md focus-within:outline-white/70">
									<PersonOutlined className="text-light" />
									<input
										type="text"
										placeholder={`Your first name ${firstname}`}
										className="w-full bg-transparent text-white outline-none"
									/>
								</div>
								<div className="flex gap-2 w-full bg-transparent outline outline-1 outline-gray-700 p-3 rounded-md focus-within:outline-white/70">
									<PersonOutlined className="text-light" />
									<input
										type="text"
										placeholder={`Your first name ${lastname}`}
										className="w-full bg-transparent text-white outline-none"
									/>
								</div>
							</div>
							<div className="flex gap-2 w-full bg-transparent outline outline-1 outline-gray-700 p-3 rounded-md focus-within:outline-white/70">
								<PersonOutlined className="text-light" />
								<input
									type="text"
									placeholder={`Update your username ${username} (optional)`}
									className="w-full bg-transparent text-white outline-none"
								/>
							</div>

							<div className="flex gap-2 w-full bg-transparent outline outline-1 outline-gray-700 p-3 rounded-md focus-within:outline-white/70">
								<BookOutlined className="text-white" />
								<textarea
									className="w-full h-full outline-none bg-transparent text-white resize-none h-[100px]"
									placeholder="Update your bio (optional)"></textarea>
							</div>
							<div className="flex gap-2 w-full bg-transparent outline outline-1 outline-gray-700 p-3 rounded-md focus-within:outline-white/70">
								<EmailOutlined className="text-light" />
								<input
									type="text"
									placeholder={`Update your email ${email}`}
									className="w-full bg-transparent text-white outline-none"
								/>
							</div>
							<div className="flex gap-2 w-full bg-transparent outline outline-1 outline-gray-700 p-3 rounded-md focus-within:outline-white/70">
								<LocationOnOutlined className="text-light" />
								<input
									type="text"
									placeholder={`Update your location (optional)`}
									className="w-full bg-transparent text-white outline-none"
								/>
							</div>
							<div className="flex gap-2 w-full bg-transparent outline outline-1 outline-gray-700 p-3 rounded-md focus-within:outline-white/70">
								<WorkOutlineOutlined className="text-light" />
								<input
									type="text"
									placeholder={`Update your work (optional)`}
									className="w-full bg-transparent text-white outline-none"
								/>
							</div>
							<div className="flex gap-2 w-full bg-transparent outline outline-1 outline-gray-700 p-3 rounded-md focus-within:outline-white/70">
								<CastForEducation className="text-light" />
								<input
									type="text"
									placeholder={`Update your education profile (optional)`}
									className="w-full bg-transparent text-white outline-none"
								/>
							</div>
            <button className="bg-gradient-to-r from-sky-500 to-violet-800 text-white p-3 rounded-lg" >Save New Info</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateModal;
