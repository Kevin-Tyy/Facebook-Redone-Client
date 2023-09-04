import { useParams } from "react-router-dom";
import Sidebar from "../../../components/SideBar/SideLeft";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../../../utils/Link";
import { GroupMedia, GroupType, UserInfo } from "../../../types/types";
import { Avatar, AvatarGroup, CircularProgress, Tooltip } from "@mui/material";
import bgImage from "../../../assets/noman.jpg";
import { HiUserGroup, HiOutlineTrash } from "react-icons/hi2";
import useDateFormatter from "../../../hooks/useDate";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Loading from "../../../components/shared/loading";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import { Link } from "react-router-dom";
import placeholderImage from "../../../assets/avatar.webp";
import DeleteModal from "../components/DeleteModal";
import GrpPostModal from "../components/GrpPostModal";
import MediaComponent from "../components/MediaComponent";
import ShareComponent from "../components/ShareComponent";
const GroupPage = () => {
	const { id } = useParams();
	const [globalLoading, setGlobalLoading] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [groupPostModal, setGroupPostModal] = useState(false);
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const [groupData, setGroupData] = useState<GroupType | null>(null);
	const [groupMedia, setGroupMedia] = useState<GroupMedia[] | null>(null);
	const fetchGroupData = () => {
		axios.get(`${BaseURL}/groups/${id}`).then((response) => {
			setGroupData(response.data.group);
			setGroupMedia(response.data.groupMedia);
		});
	};
	useEffect(() => {
		fetchGroupData();
	}, [id]);
	const joinGroup = async (groupId: string, isMember: boolean) => {
		setGlobalLoading(true);
		if (!isMember) {
			return axios
				.post(`${BaseURL}/groups/join/${groupId}`, { userId: userId })
				.then((response) => {
					fetchGroupData();
					toast.success(response.data.msg);
					setGlobalLoading(false);
				})
				.catch((error) => {
					toast.error(error.data.msg);
					setGlobalLoading(false);
				});
		}
		return axios
			.delete(`${BaseURL}/groups/join/${groupId}`, {
				data: {
					userId: userId,
				},
			})
			.then((response) => {
				fetchGroupData();
				toast.success(response.data.msg);
				setGlobalLoading(false);
			})
			.catch((error) => {
				toast.error(error.msg);
				setGlobalLoading(false);
			});
	};
	return (
		<main className=" min-h-screen bg-white dark:bg-background-primary pb-20">
			<div className="p-2 md:p-10 2xl:p-0 flex 2xl:justify-center">
				<div className="w-full sm:pt-6 flex justify-center gap-6">
					<Sidebar />
					<section className="h-full min-h-screen w-full max-w-[750px]">
						{!groupData ? (
							<div className="w-full h-full grid place-content-center pb-[20vh]">
								<CircularProgress />
							</div>
						) : (
							<section>
								<header className="relative">
									<img
										src={bgImage}
										className="max-h-[250px] w-full object-cover rounded-t-2xl"
									/>
									<div className="absolute top-[75%] left-[5%]">
										{groupData.groupImage ? (
											<div className="bg-slate-300 dark:bg-primary-100 p-1.5 rounded-full w-fit">
												<img
													src={groupData.groupImage}
													className="h-40 w-40 object-cover rounded-full"
												/>
											</div>
										) : (
											<div className=" h-40 w-40 rounded-xl grid place-content-center bg-gradient-to-br from-blue-700 to-blue-300 text-white">
												<HiUserGroup size={40} />
											</div>
										)}
									</div>
								</header>
								<div className="bg-slate-200 dark:bg-primary-200 rounded-b-xl min-h-[120px]">
									<div className="pt-32 sm:pt-4 sm:ml-56 p-4  text-slate-700 dark:text-white relative flex flex-col space-y-1">
										<h1 className="text-xl flex items-center gap-2">
											{groupData.groupName}{" "}
											<HiUserGroup className="text-gray-600" />
										</h1>
										<p className="text-gray-400 w-5/6">
											{groupData.groupDescription}
										</p>
										<div className="flex py-3 gap-3 items-center">
											<AvatarGroup total={groupData.groupMembers.length}>
												{groupData.groupMembers
													.slice(0, 5)
													.map((member, index) => (
														<Avatar
															key={index}
															src={member.profileimage}
															sx={{ width: 20, height: 20 }}
														/>
													))}
											</AvatarGroup>
											<p className="text-gray-400 text-sm">
												{groupData.groupMembers.length} member
												{groupData.groupMembers.length !== 1 && "s"}
											</p>
										</div>
										<p className="absolute top-0 right-0 p-4 text-gray-500 text-sm">
											Created {useDateFormatter(new Date(groupData.createdAt))}{" "}
											ago
										</p>
										{groupData?.admin.userId === userId ? (
											<div className="absolute right-3 bottom-2">
												<Tooltip title="Delete group">
													<div
														className="text-red-500 hover:bg-slate-400 dark:hover:bg-primary-100 p-2 rounded-md cursor-pointer"
														onClick={() => setDeleteModal(true)}>
														<HiOutlineTrash size={18} />
													</div>
												</Tooltip>
											</div>
										) : (
											<button
												onClick={() =>
													joinGroup(
														groupData._id,
														groupData.groupMembers.some(
															(member) => member.userId === userId
														)
													)
												}
												className="self-end py-3 px-4 bg-blue-base rounded-full text-white -translate-y-5 hover:bg-blue-light transition">
												{groupData.groupMembers.some(
													(member) => member.userId === userId
												)
													? "Leave group"
													: "Join group"}
											</button>
										)}
									</div>
								</div>
								<div className="bg-slate-200 dark:bg-primary-200 mt-1 sm:mt-3 rounded-xl  relative">
									{groupData &&
										groupData.groupMembers.some(
											(member) => member.userId === userId
										) && (
											<ShareComponent
												groupData={groupData}
												fetchGroupData={fetchGroupData}
											/>
										)}
								</div>
								{groupMedia && groupMedia?.length === 0 ? (
									<div className=" flex bg-slate-200 dark:bg-primary-200 mt-1 p-10 rounded-lg sm:mt-3 flex-col justify-center items-center">
										<h1 className=" text-slate-700 dark:text-white text-center">
											No activity in the group yet
										</h1>
										<button
											onClick={() => setGroupPostModal(true)}
											className="bg-blue-base text-white p-3 rounded-full mt-3">
											Create new post
										</button>
									</div>
								) : (
									<div className="mt-3">
										<h1 className="text-lg text-slate-500 text-center mt-6 mb-4 dark:text-white">
											Activity within this group
										</h1>
										{groupMedia?.map((item, index) => (
											<MediaComponent item={item} key={index} />
										))}
									</div>
								)}
							</section>
						)}
					</section>
					<section className="hidden xl:flex h-fit flex-col sticky top-[90px] w-full 2xl:min-w-[400px] max-w-[400px]">
						<div className="bg-slate-200 dark:bg-primary-200 p-5 flex rounded-lg w-full flex-col gap-4 ">
							<div className="flex justify-between items-center  text-slate-700 dark:text-white ">
								<h1 className="text-xl">Group Members</h1>
								<HiUserGroup
									size={30}
									className="hover:bg-gray-600/40 p-1.5 rounded-md cursor-pointer"
								/>
							</div>
							{groupData && (
								<div className="flex flex-col space-y-5">
									{groupData?.groupMembers.map((member, index) => (
										<Link to={`/profile/${member.userId}`} key={index}>
											<div className="flex gap-2  items-center">
												<div className="bg-slate-300 dark:bg-primary-100 w-fit p-1 rounded-full">
													<img
														src={member.profileimage || placeholderImage}
														className="w-16 h-16 object-cover rounded-full"
													/>
												</div>
												<div className="space-y-1">
													<p className=" text-slate-700 dark:text-light cursor-pointer capitalize hover:underline">
														{member.firstname} {member.lastname}
														{member.userId === userId && (
															<span className="text-sm text-gray-500">
																{" "}
																- You{" "}
															</span>
														)}
														{groupData.admin.userId === member.userId && (
															<span className="text-gray-400 text-sm">
																{" "}
																(admin)
															</span>
														)}
													</p>
													<div className="flex gap-1 text-gray-400/70">
														<p className="text-sm capitalize">
															@{member.username}
														</p>
														<span>•</span>
														<p className="text-sm">{member?.email}</p>
													</div>
												</div>
											</div>
										</Link>
									))}
								</div>
							)}
						</div>
					</section>
				</div>
			</div>

			{globalLoading && <Loading />}
			<DeleteModal
				onClose={() => setDeleteModal(false)}
				isOpen={deleteModal}
				groupId={id!}
			/>
			{groupData && (
				<GrpPostModal
					isOpen={groupPostModal}
					onClose={() => setGroupPostModal(false)}
					groupData={groupData}
					fetchGroupData={fetchGroupData}
				/>
			)}
		</main>
	);
};

export default GroupPage;
