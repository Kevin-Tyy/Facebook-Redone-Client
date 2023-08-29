import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import StoryModal from "../Modals/StoryModal";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import placeholderAvatar from "../../assets/avatar.webp";
import StoryPreview from "./Preview/StoryPreview";

import { StoryType, UserInfo } from "../../types/Types";
import StorySkeleton from "../Loaders/Skeleton/Story";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { useSelector } from "react-redux";
import useDateFormatter from "../../hooks/useDate";
const Story = () => {
	const [isToggled, setIsToggled] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const [stories, setstories] = useState<StoryType[]>([]);
	const [currentCreatorIndex, setCurrentCreatorIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const fetchStory = async (url: string) => {
		setLoading(true);
		const dataObj = await axios.get(url);
		const { stories } = dataObj.data;
		setstories(stories);
		setLoading(false);
	};
	useEffect(() => {
		fetchStory(`${BaseURL}/stories`);
	}, []);
	const handleStoryView = () => {
		setIsInView(!isInView);
	};
	const {
		user: {
			userInfo: { profileimage },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: UserInfo } };

	const creators = [...new Set(stories.map((story) => story.creator.userId))];

	return (
		<div className="w-full ">
			{loading ? (
				<div className="flex gap-6 h-[250px] overflow-x-scroll overflow-y-hidden pb-5">
					<StorySkeleton />
				</div>
			) : (
				<div className="space-y-2 ">
					<div className="w-fit group">
						<h1 className="text-white text-lg">Stories</h1>
						<div className="w-7 h-1 bg-blue-base rounded-full mt-1 transition-all duration-500 group-hover:w-full"></div>
					</div>
					<div className=" flex gap-4 h-[230px] overflow-x-scroll overflow-y-hidden pb-3">
						<div className="w-[130px] overflow-hidden relative rounded-2xl">
							<img
								src={profileimage || placeholderAvatar}
								className="object-cover rounde-3xl h-[160px] w-full"
							/>
							<div className="bg-primary-200 absolute bottom-0 w-full h-20"></div>
							<div
								className="flex flex-col justify-center items-center absolute bottom-7 left-7 cursor-pointer"
								onClick={() => setIsToggled(true)}>
								<div className="bg-primary-200 p-1.5 rounded-full">
									<div className="bg-blue-base text-white p-2  rounded-full">
										<Add fontSize="medium" />
									</div>
								</div>
								<p className="text-white">Add to story</p>
							</div>
						</div>
						{stories && (
							<div className=" flex gap-3">
								{creators.map((creatorId, index) => (
									<div
										onClick={() => {
											setCurrentCreatorIndex(index);
											handleStoryView()
										}}
										key={index}
										className="h-full w-[130px] overflow-hidden rounded-lg relative cursor-pointer group ring-1 ring-primary-100/40">
										<div className="z-[3] absolute flex items-start h-full pb-4 w-full gap-2 top-2 left-2">
											<div className="flex items-center gap-2">
												<div className=" bg-blue-base w-full max-w-fit rounded-full p-[3px] flex items-start justify-start">
													<img
														src={
															stories.find(
																(story) => story.creator.userId === creatorId
															)?.creator?.profileimage
														}
														className="min-w-[35px] max-w-[35px] h-[35px] rounded-full object-cover "
													/>
												</div>
												<div className="w-full overflow-hidden leading-4">
													<p className=" text-white capitalize whitespace-nowrap font-bold overflow-ellipsis">
														{
															stories.find(
																(story) => story.creator.userId === creatorId
															)?.creator?.username.split(" ")[0]
														}{" "}
													</p>
													<p className="text-gray-300 text-xs">
														{useDateFormatter(
															new Date(
																stories.find(
																	(story) => story.creator.userId === creatorId
																)?.createdAt as Date
															)
														)}
													</p>
												</div>
											</div>
										</div>
										<img
											src={
												stories.find(
													(story) => story.creator.userId === creatorId
												)?.storyMedia
											}
											className="h-full w-full object-cover  transition duration-500"
										/>
										<div className="w-full h-full bg-gradient-to-b from-black/20 cursor-pointer to-black/40 z-[2] absolute inset-0 transition rounded-lg"></div>
									</div>
								))}
								{isInView && (
									<StoryPreview
										onClose={() => setIsInView(false)}
										stories={stories}
										toggleStoryModal={() => setIsToggled(true)}
										setCurrentCreatorIndex={setCurrentCreatorIndex as any}
										currentCreatorIndex={currentCreatorIndex}
									/>
								)}
							</div>
						)}
					</div>
				</div>
			)}
			<StoryModal onClose={() => setIsToggled(false)} isOpen={isToggled} />
		</div>
	);
};

export default Story;
