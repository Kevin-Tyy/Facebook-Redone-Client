import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import StoryModal from "../Modals/StoryModal";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";

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
	const {  } = useSelector(loggedInUser)
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
				<div className=" flex gap-5">
					{stories.map((story) => (
						<div className="h-full overflow-hidden rounded-md">
							<img src={story.storyMedia}  className="h-full w-[125px] object-coer  transition duration-300 hover:scale-105"/>
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
