import { CloseRounded } from "@mui/icons-material";
import { motion } from "framer-motion";
interface Props {
	profileimage: string;
	username: string;
	setViewImage: (value: any) => void;
	email: string;
}
const ProfileImage = ({
	email,
	profileimage,
	username,
	setViewImage,
}: Props) => {
	return (
		<div
			className="fixed top-0 right-0 left-0 bottom-0 h-screen w-full bg-gray-950/60 backdrop-blur-sm z-[20] flex items-center justify-center"
			onClick={() => setViewImage(false)}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.1 }}
				transition={{ duration: 0.2 }}
				variants={{
					hidden: { opacity: 0, y: -30 },
					visible: { opacity: 1, y: 0 },
				}}
				className="relative w-[600px] bg-primary-200 rounded-md py-4">
				<div
					onClick={() => setViewImage(false)}
					className="hover:bg-gray-700 rounded-full p-1.5 absolute top-5 right-3 cursor-pointer ">
					<CloseRounded sx={{ color: "#fff" }} />
				</div>
				<div className="p-1">
					<div className="p-2">
						<p className="capitalize text-light text-center text-xl">
							{username} <span>Updated his profile picture</span>
						</p>
					</div>
					<hr className="border-[1px] border-gray-800 " />
					<div className="flex gap-2 items-center p-3">
						<div className="bg-primary-100 p-[3px] rounded-full">
							<img
								src={profileimage}
								className="h-[50px] w-[50px] rounded-full"
							/>
						</div>
						<div>
							<p className="capitalize text-light">{username}</p>
							<p className="text-gray-400/90">{email}</p>
						</div>
					</div>
				</div>
				<img src={profileimage} className="w-full h-full" />
			</motion.div>
		</div>
	);
};

export default ProfileImage;
