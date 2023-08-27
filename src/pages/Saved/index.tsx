import axios from "axios";
import { useEffect, useState } from "react";
import { SavedPost, UserInfo } from "../../types/Types";
import { BaseURL } from "../../utils/Link";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import RepostBox from "../../components/Posts/PostComponents/RepostComponent";
import PostBox from "../../components/Posts/PostComponents/PostBoxComponent";
import PostLoader from "../../components/Loaders/Skeleton/Post";
import { BsBookmark } from "react-icons/bs";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Saved = () => {
	const [savedPosts, setSavedPosts] = useState<SavedPost[] | null>(null);
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	useEffect(() => {
		const getSavedPosts = async (): Promise<void> => {
			axios.get(`${BaseURL}/save/${userId}`).then((response) => {
				setSavedPosts(response.data.posts);
				console.log(response.data);
			});
		};
		getSavedPosts();
	}, []);
	const navigate = useNavigate()
	return (
		<section className="w-full max-w-[700px]">
			<div className="mb-4 group w-fit cursor-default ml-3">
				<h1 className="text-center text-lg text-white">Saved Posts</h1>
				<div className="w-10 h-1 bg-blue-base rounded-full mt-1 group-hover:w-full transition-all duration-300"></div>
			</div>
			<div>
				<div className="flex flex-col gap-3 sm:gap-6">
					{!savedPosts ? (
						<div>
							<PostLoader />
						</div>
					) : !savedPosts.length ? (
						<div className="bg-primary-200 grid place-content-center rounded-lg">
							<div className="m-10 flex flex-col items-center gap-3">
								<div className="flex text-white items-center gap-3">
									<BsBookmark size={20} />
									<p className=" text-lg">You have not saved any posts yet</p>
								</div>
								<Button
									onClick={() => navigate('/i/flow')}
									sx={{
										color: "white",
										backgroundColor: "#0C88EF",
										textTransform: "capitalize",
										borderRadius: "40px",
										width: "fit-content",
										m: "10px",
										px: "20px",
										py: "10px",
										"&:hover": { backgroundColor: "#3293e3" },
									}}>
									Browse more
								</Button>
							</div>
						</div>
					) : (
						savedPosts.map((post, index) => (
							<div key={index}>
								{post.post.isReposted ? (
									<RepostBox post={post.post} />
								) : (
									<PostBox post={post.post} />
								)}
							</div>
						))
					)}
				</div>{" "}
			</div>
		</section>
	);
};

export default Saved;
