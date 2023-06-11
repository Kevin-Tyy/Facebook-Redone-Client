import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import StoryModal from "../Modals/StoryModal";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
// import { useSelector } from "react-redux";
// import { loggedInUser } from "../../redux/features/AuthSlice";
import StoryPreview from "./Preview/storyPreview";
import { StoryType } from "../../types/Types";


const Story = () => {
	const [isToggled, setIsToggled] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const [storyInView , setStoryInView] = useState<StoryType | null>(null);
	const [stories, setstories] = useState<StoryType[]>([]);
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
	// const {} = useSelector(loggedInUser);
	const handleStoryView = () => {
		setIsInView(!isInView);
	};
	return (
		<div className="w-full flex gap-6 h-60  overflow-x-scroll overflow-y-hidden pb-5">
			<div className="bg-primary-200 min-w-[130px] flex justify-center items-center rounded-2xl">
				<div
					onClick={handleStoryToggle}
					className="bg-primary-100 p-2 rounded-full cursor-pointer">
					<Add fontSize="medium" />
				</div>
			</div>

			{stories && (
				<div className=" flex gap-5">
					{stories.map((story, index) => (
						<div
							key={index}
							className="h-full w-[130px] rounded-full relative"
							onClick={() => {
								handleStoryView()
								setStoryInView(story)	
							}}>
							<div className="z-[3] absolute flex justify-start items-center w-full gap-2 top-2 left-2">
								<div className=" bg-primary-100 rounded-full p-[3px] top-2 left-2">
									<img
										src={story.creator?.profileimage}
										className="min-w-[35px] max-w-[35px] h-[35px] rounded-full  "
									/>
								</div>
								<div>
									<p className=" text-light capitalize whitespace-nowrap ">
										{story.creator?.username.split(" ")[0]}
									</p>
								</div>
							</div>
							<img
								src={story.storyMedia}
								className="h-full w-[130px] object-cover rounded-xl transition duration-100 hover:scale-110"
							/>
							<div className="w-full h-full bg-gradient-to-b from-black/80 cursor-pointer to-black/40 z-[2] absolute top-0 right-0 left-0 bottom-0 rounded-lg"></div>
						</div>
					))}
					{isInView && <StoryPreview handleView={handleStoryView} storyInView={storyInView} stories={stories}/>}
				</div>
			)}
			{isToggled && <StoryModal handleStoryToggle={handleStoryToggle} />}
		</div>
	);
};

export default Story;
