import {
	EmojiEmotionsRounded,
	ImageRounded,
	MoreHoriz,
	VideocamRounded,
} from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import PostModal from "../Modals/PostModal";
const utilObj = [
	{ icon: <VideocamRounded />, title: "Live Video" },
	{ icon: <ImageRounded />, title: "Photo/video" },
	{ icon: <EmojiEmotionsRounded />, title: "Feeling/activity" },
	{ icon: <MoreHoriz /> },
];
import { useState } from "react";

const PostComponent = () => {
	const [isPostModal, setIsPostModal] = useState<boolean>(false);
	return (
		<div className="">
			<div className="flex flex-col bg-primary-200 rounded-lg p-6 gap-6">
				<div className="flex items-center gap-6">
					<Avatar>J</Avatar>
					<p className="bg-gray-800/50 text-light hover:bg-gray-800 rounded-full transition duration-300 cursor-pointer  w-full p-4">
						What's on your mind, John Doe?
					</p>
				</div>
				<div className="flex gap-4 justify-between">
					<div className="flex gap-4">
						{utilObj.map((obj, index) => (
							<Button
								sx={{
									backgroundColor: "#0C141C",
									textTransform: "capitalize",
									"&:hover": { backgroundColor: "#0C141C" },
									color: "#D5D5D5",
									borderRadius: "7px",
									whiteSpace: "nowrap ",
									p: "6px",
								}}
								className="flex gap-2"
								key={index}>
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
						))}
					</div>

					<Button
						sx={{
							color: "white",
							backgroundColor: "#0C88EF",
							textTransform: "capitalize",
							"&:hover": { backgroundColor: "#0C88EF" },
						}}
						onClick={() => setIsPostModal(true)}>
						Post
					</Button>
				</div>
				{isPostModal && (
					<PostModal setIsPostModal={setIsPostModal}/>
				)}
			</div>
		</div>
	);
};
export default PostComponent;
