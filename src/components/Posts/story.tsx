import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import StoryModal from "../Modals/StoryModal";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";

interface Story {
	storyMedia: string;
	storyCaption?: string;
	creator: object;
}

const Story = () => {
	const [isToggled, setIsToggled] = useState(false);
	const [stories, setstories] = useState<Array<Story>>([]);
	const handleStoryToggle = () => {
		setIsToggled(!isToggled);
	};
	const fetchStory = async (url: string) => {
		const dataObj = await axios.get(url);
		const { stories } = dataObj.data;
		setstories(stories);
	};
	console.log(stories);
	useEffect(() => {
		fetchStory(`${BaseURL}/stories`);
	}, []);
	const {} = useSelector(loggedInUser);
	return (
		<div className="w-full flex gap-6 h-52  overflow-x-scroll">
			<div className="bg-primary-200 w-[125px]  flex justify-center items-center rounded-md">
				<div
					onClick={handleStoryToggle}
					className="bg-primary-100 p-2 rounded-md cursor-pointer">
					<Add fontSize="medium" />
				</div>
			</div>

			{stories && (
				<div className=" flex gap-5 overflow-scroll">
					{stories.map((story, index) => (
						<div
							key={index}
							className="h-full overflow-scroll rounded-md relative">
							<div className="z-[20] absolute flex justify-start items-center w-full">
								<div className=" bg-primary-100 rounded-full p-[3px] top-2 left-2">
									<img
										src={story.creator?.profileimage}
										className="w-10 h-10 rounded-full  "
									/>
								</div>
								<p className=" text-light font-bold capitalize whitespace-nowrap">
									{story.creator.username}
								</p>
							</div>
							<img
								src={story.storyMedia}
								className="h-full w-[125px] object-cover  transition duration-500 hover:scale-105"
							/>
						</div>
					))}
				</div>
			)}
			{isToggled && <StoryModal handleStoryToggle={handleStoryToggle} />}
		</div>
	);
};

export default Story;
