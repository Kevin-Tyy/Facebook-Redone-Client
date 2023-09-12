import { useState, useEffect, useRef } from "react";
import StoryModal from "../Modals/StoryModal.tsx";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import placeholderAvatar from "../../assets/avatar.webp";
import StoryPreview from "./Preview/StoryPreview";
import { HiUserGroup, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { BiPlus } from "react-icons/bi";
import { StoryType, UserInfo } from "../../types/types";
import StorySkeleton from "../Loaders/Skeleton/Story";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { useSelector } from "react-redux";
import useDateFormatter from "../../hooks/useDate";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
const Story = () => {
	const [isToggled, setIsToggled] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const [stories, setstories] = useState<StoryType[]>([]);
	const [currentCreatorIndex, setCurrentCreatorIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const initialfetchStory = (url: string) => {
		setLoading(true);
		axios
			.get(url)
			.then((response) => {
				setstories(response.data.stories);
			})
			.catch((error) => {
				toast.error(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const fetchStories = (url: string) => {
		axios.get(url).then((response) => {
			setstories(response.data.stories);
		});
	};
	useEffect(() => {
		initialfetchStory(`${BaseURL}/stories`);
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
	const rowRef = useRef<HTMLDivElement>(null);
	const [isScrolled, setIsScrolled] = useState(false);
	const handleClick = (dir: "left" | "right") => {
		setIsScrolled(true);
		if (rowRef.current) {
			const { scrollLeft, clientWidth } = rowRef.current;
			const scrollTo =
				dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
			rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
			if (scrollTo < 10) setIsScrolled(false);
		}
	};
	return (
		<div className="w-full ">
			{loading ? (
				<div className="flex gap-6 h-[250px] overflow-x-scroll overflow-y-hidden pb-5">
					<StorySkeleton />
				</div>
			) : (
				<div className="space-y-2 sm:mt-4">
					<div className="w-fit group mb-4">
						<h1 className=" text-slate-700 dark:text-white text-lg">Stories</h1>
						<div className="w-7 h-1 bg-blue-base rounded-full mt-1 transition-all duration-500 group-hover:w-full"></div>
					</div>
					<div className="group relative">
						<div
							className={`bg-slate-200/70 dark:text-white  dark:bg-primary-100/70 absolute z-10 top-0 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-slate-200 dark:hover:bg-gray-700 cursor-pointer bottom-0 h-fit rounded-full my-auto p-3 backdrop-blur ${
								!isScrolled && "hidden"
							}`}
							onClick={() => handleClick("left")}>
							<HiChevronLeft size={23} />
						</div>
						<div
							className={`bg-slate-200/70 dark:text-white dark:bg-primary-100/70 absolute z-10 top-0 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-slate-200 dark:hover:bg-gray-700 cursor-pointer bottom-0 h-fit rounded-full my-auto p-3 backdrop-blur `}
							onClick={() => handleClick("right")}>
							<HiChevronRight size={23} />
						</div>
						<div
							ref={rowRef}
							className="relative flex gap-4 h-[230px] overflow-x-scroll overflow-y-hidden">
							<div className="w-32 min-w-[128px] overflow-hidden relative rounded-2xl  shadow-md shadow-slate-300 dark:shadow-black/40">
								<img
									src={profileimage || placeholderAvatar}
									className="object-cover rounde-3xl h-[160px] w-full"
								/>
								<div className="bg-slate-200 dark:bg-primary-200 absolute bottom-0 w-full h-20"></div>
								<div
									className="flex flex-col justify-center items-center absolute bottom-7 left-7 cursor-pointer"
									onClick={() => setIsToggled(true)}>
									<div className="bg-slate-200 dark:bg-primary-200 p-1 dark:p-1.5 rounded-full">
										<div className="bg-blue-base text-white p-1.5  rounded-full">
											<BiPlus size={25} />
										</div>
									</div>
									<p className=" text-slate-700 dark:text-white">
										Add to story
									</p>
								</div>
							</div>
							{stories.length < 1 && (
								<div className="w-full h-full grid place-content-center">
									<div className="flex space-x-2 items-center text-slate-700 dark:text-white">
										<HiUserGroup size={24} />
										<p className="text-lg">No stories available</p>
									</div>
									<Button
										onClick={() => setIsToggled(true)}
										sx={{
											color: "white",
											justifySelf: "center",
											backgroundColor: "#0C88EF",
											textTransform: "capitalize",
											borderRadius: "40px",
											mt: "10px",
											alignSelf: "flex-start",
											px: "20px",
											py: "10px",
											"&:hover": { backgroundColor: "#3293e3" },
										}}>
										Create new
									</Button>
								</div>
							)}
							{stories && (
								<div className=" flex gap-3">
									{creators.map((creatorId, index) => (
										<div
											onClick={() => {
												setCurrentCreatorIndex(index);
												handleStoryView();
											}}
											key={index}
											className="h-full w-32 min-w-[128px] overflow-hidden rounded-xl relative cursor-pointer group shadow-md shadow-slate-300 dark:shadow-black/40">
											<div className="z-[3] absolute flex items-start h-full pb-4 w-full gap-2 top-2 left-2">
												<div className="flex flex-col justify-between h-full items-center gap-2">
													<div className="relative bg-blue-light w-fit rounded-full p-1 flex items-start justify-start">
														<img
															src={
																stories.find(
																	(story) => story.creator.userId === creatorId
																)?.creator?.profileimage
															}
															className="w-10 h-10 rounded-full object-cover "
														/>
														<div className="bg-blue-base absolute -top-1 -right-2 p-3 w-7 h-7 text-sm rounded-full grid place-content-center text-white">
															{
																stories.filter(
																	(story) => story.creator.userId === creatorId
																).length
															}
														</div>
													</div>
													<div className="w-full overflow-hidden leading-4">
														<p className=" text-white capitalize whitespace-nowrap font-bold overflow-ellipsis">
															{
																stories
																	.find(
																		(story) =>
																			story.creator.userId === creatorId
																	)
																	?.creator?.username.split(" ")[0]
															}{" "}
														</p>
														<p className="text-gray-300 text-xs">
															{useDateFormatter(
																new Date(
																	stories.find(
																		(story) =>
																			story.creator.userId === creatorId
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
												className="h-full w-full object-cover transition duration-500"
											/>
											<div className="w-full h-full  bg-black/30 cursor-pointer opacity-10 group-hover:bg-black z-[2] absolute inset-0 transition rounded-lg"></div>
										</div>
									))}
									{isInView && (
										<StoryPreview
											onClose={() => setIsInView(false)}
											isInView={isInView}
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
				</div>
			)}
			<StoryModal
				onClose={() => setIsToggled(false)}
				isOpen={isToggled}
				fetchStories={fetchStories}
			/>
		</div>
	);
};

export default Story;
