import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import StoryModal from "../Modals/StoryModal";
import axios from "axios";
import { BaseURL } from "../../utils/Link";

interface Story {
	storyMedia : string
	storyCaption ?: string
}

const Story = () => {
	const [isToggled, setIsToggled] = useState(false);
	const [stories, setstories] = useState<Array<Story>>([]);
	const handleStoryToggle = () => {
		setIsToggled(!isToggled);
	};
	const fetchStory = async (url: string) => {
		const dataObj = await axios.get(url);
		const { stories } = dataObj.data
		setstories(stories);
	};
	console.log(stories);
	useEffect(() => {
		fetchStory(`${BaseURL}/stories`);
	}, []);
	return (
		<div className="w-full flex gap-6 h-60  overflow-x-scroll">
			<div className="bg-primary-200 w-36  flex justify-center items-center rounded-md">
				<div
					onClick={handleStoryToggle}
					className="bg-primary-100 p-2 rounded-md cursor-pointer">
					<Add fontSize="medium" />
				</div>
			</div>
		
			{stories && (
				<div className=" flex gap-5">
					{stories.map((story) => (
						<div className="h-full">
							<img src={story.storyMedia}  className="h-full w-36 object-cover rounded-md"/>
						</div>
					))}
				</div>
			)}
			{isToggled && (
				<StoryModal handleStoryToggle={handleStoryToggle} />
			)}
		</div>
	);
};

export default Story;
