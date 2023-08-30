import { HiOutlineFaceSmile, HiOutlineCamera, HiOutlineVideoCamera } from "react-icons/hi2";
import PostModal from "../Modals/PostModal";
const utilObj = [
	{ icon: <HiOutlineVideoCamera size={26} />, title: "Live Video" },
	{ icon: <HiOutlineCamera size={26}/>, title: "Photo/video" },
	{ icon: <HiOutlineFaceSmile size={26} />, title: "Feeling/activity" },
];
import { useState } from "react";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { UserInfo } from "../../types/types";
import placeholderAvatar from "../../assets/avatar.webp";
import { Button } from "@mui/material";
const PostComponent = ({
	fetchPosts,
}: {
	fetchPosts: (url: string) => Promise<void>;
}) => {
	const [isPostModal, setIsPostModal] = useState<boolean>(false);
	const {
		user: {
			userInfo: { profileimage, username },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	return (
		<div className="">
			<div className="flex flex-col bg-primary-200 rounded-2xl p-4 md:p-6 gap-6">
				<div className="flex items-center gap-6">
					<div className="bg-primary-100 p-[3px] rounded-full">
						<img
							src={profileimage || placeholderAvatar}
							className="w-14 h-12  rounded-full object-cover"
						/>
					</div>
					<p
						className="bg-primary-100/30 text-light hover:bg-primary-100 rounded-full transition duration-300 cursor-pointer  w-full p-4"
						onClick={() => setIsPostModal(true)}>
						What's on your mind, <span className="capitalize">{username}</span>?
					</p>
				</div>
				<div className="flex gap-4 justify-between flex-wrap">
					<div className="flex gap-2 md:gap-4 w-full text-[#13131a]">
						{utilObj.map((obj, index) => (
							<div key={index} onClick={() => setIsPostModal(true)} className="w-full bg-primary-100/30 rounded-md">
								<Button
									sx={{
										color : 'white',
										textTransform: "capitalize",
										p: "10px",
										borderRadius: "10px",
										display: "flex",
										whiteSpace: "nowrap",
										gap: "15px",
										width : "100%",
									}}>
									<span
										className={`text-${
											index == 0
												? "green-500"
												: index == 1
												? "yellow-400"
												: index == 2
												? "sky-800"
												: "gray-400"
										}`}>
										{obj.icon}
									</span>
									{obj?.title}
								</Button>
							</div>
						))}
					</div>
				</div>
				<PostModal
					onClose={() => setIsPostModal(false)}
					isOpen={isPostModal}
					fetchPosts={fetchPosts}
				/>
			</div>
		</div>
	);
};
export default PostComponent;
