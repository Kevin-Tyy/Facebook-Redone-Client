// import React from "react";
import {
	CloseRounded,
	PeopleAltRounded,
	EmojiEmotionsOutlined,
	GifBoxRounded,
	MoreHoriz,
} from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { Image } from "@mui/icons-material";
interface Props {
	setIsPostModal: (value: any) => void;
}

const utilIcons = [
  <EmojiEmotionsOutlined fontSize="large"/>,
  <GifBoxRounded fontSize="large"/>,
  <MoreHoriz fontSize="large"/>
]
const PostModal = ({ setIsPostModal }: Props) => {
	return (
		<div
			className="backdrop-blur-sm bg-gray-950/50 h-screen w-full fixed top-0 right-0 bottom-0 left-0 z-[10] flex justify-center items-center "
			onClick={() => setIsPostModal(false)}>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative bg-primary-200 w-full  max-w-[550px] p-3 rounded-lg ">
				<div className="p-3 border-b border-gray-700">
					<h1 className="text-2xl text-center font-bold text-light">
						Create a post
					</h1>

					<div
						onClick={() => setIsPostModal(false)}
						className="hover:bg-gray-700 rounded-full p-1.5 absolute top-5 right-3 cursor-pointer ">
						<CloseRounded sx={{ color: "#fff" }} />
					</div>
				</div>
				<div className="p-2">
					<div className="flex items-center gap-2">
						<Avatar>J</Avatar>
						<div className="flex flex-col items-center">
							<p className="text-light font-semibold">John Doe</p>
							<div className="text-light bg-gray-700 px-1 py-[1px] rounded-md flex items-center gap-1">
								<PeopleAltRounded sx={{ fontSize: 15 }} />
								Friends
							</div>
						</div>
					</div>
					<form className="flex flex-col gap-4">
						<textarea
							rows={7}
							className="w-full resize-none outline-none  bg-transparent text-2xl text-light p-2"
							placeholder="What's on your mind, John?"></textarea>
						<div className="w-full border border-gray-700 py-3 rounded-md flex items-center justify-between px-4">
              <p className="text-light">Add to your post</p>
							<div className="flex gap-3">
								<label htmlFor="imagepost">
									<Image
										className="text-green-500  cursor-pointer"
										fontSize="large"
									/>
								</label>
								<input
									id="imagepost"
									type="file"
									accept="image/png, image/jpeg"
									className="hidden"
								/>
								
                {utilIcons.map((icon, index)=>(
                  <span className={`text-${index == 0 ? 'yellow-400' : index == 1 ? 'sky-800' : 'gray-600'}`}>
                    {icon}

                  </span>
                ))}
							</div>
						</div>
						<Button
              sx={{ backgroundImage : 'linear-gradient(to right , #04477e , #791fe0  )', p : 1.5, color : '#d5d5d5', textTransform : 'capitalize'}}
							className="text-white rounded-md transtition duration-75">
							Post
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PostModal;
