import { useEffect, useState } from "react";
import { GroupType, UserInfo, Userdata } from "../../../types/types";
import axios from "axios";
import { BaseURL } from "../../../utils/Link";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import useDateFormatter from "../../../hooks/useDate";
import { Avatar, AvatarGroup } from "@mui/material";
import { HiUserGroup } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../../../components/shared/loading";
import GroupLoader from "../../../components/Loaders/Skeleton/GroupLoader";
interface Props {
	userData: Userdata;
}

const GroupLayout = ({ userData }: Props) => {
	const [globalLoading, setGlobalLoading] = useState(false);
	const { id } = useParams();
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const fetchGroups = () => {
		axios.get(`${BaseURL}/groups`).then((response) => {
			setGroups(response.data);
		});
	};
	const [groups, setGroups] = useState<GroupType[] | null>(null);

	useEffect(() => {
		fetchGroups();
	}, []);
	const userGroups =
		groups &&
		groups.filter((group) =>
			group.groupMembers.some((member) => member.userId === id)
		);
	const navigate = useNavigate();

	const joinGroup = async (groupId: string, isMember: boolean) => {
		setGlobalLoading(true);
		if (!isMember) {
			return axios
				.post(`${BaseURL}/groups/join/${groupId}`, { userId: userId })
				.then((response) => {
					fetchGroups();
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
				fetchGroups();
				toast.success(response.data.msg);
				setGlobalLoading(false);
			})
			.catch((error) => {
				toast.error(error.msg);
				setGlobalLoading(false);
			});
	};

	return (
		<div className="bg-slate-100 dark:bg-primary-200/50 rounded-lg p-3 md:p-10">
			<div className="text-slate-700 dark:text-light">
				{userGroups && (
					<div className="mb-4 group w-fit cursor-default ml-3">
						<h1 className=" text-slate-700 dark:text-white text-lg mb-1 first-letter:capitalize">
							{userData.username}'s  groups
						</h1>
						<div className="w-10 h-1 bg-blue-base rounded-full mt-1 group-hover:w-full transition-all duration-300"></div>
					</div>
				)}
				<section className="flex flex-col gap-2">
					{userGroups &&
						userGroups.map((group, index) => (
							<div
								key={index}
								className=" text-slate-700 dark:text-white rounded-lg bg-slate-200 dark:bg-primary-200  hover:bg-slate-300/70 dark:hover:bg-primary-100/60 p-3 sm:p-6">
								<div className="relative flex gap-8 flex-col">
									<div className="relative flex gap-5 pt-5 sm:pt-0 md:gap-7 items-center">
										<div
											onClick={() => navigate(`/group/${group._id}`)}
											className="cursor-pointer w-fit">
											{group?.groupImage ? (
												<img
													src={group?.groupImage}
													alt=""
													className="w-[70px] h-[70px] min-w-[70px] sm:w-[120px] sm:min-w-[120px] rounded-md sm:h-[120px] object-cover"
												/>
											) : (
												<div
													className={`w-[120px] h-[120px] grid place-content-center bg-gradient-to-br ${
														index % 3 === 0
															? "from-blue-700"
															: index % 3 === 1
															? "from-green-700"
															: index % 3 === 2
															? "from-fuchsia-700"
															: "from-red-700"
													} rounded-md ${
														index % 3 === 0
															? "to-blue-300"
															: index % 3 === 1
															? "to-green-300"
															: index % 3 === 2
															? "to-fuchsia-300"
															: "to-red-300"
													}`}>
													<HiUserGroup size={40} />
												</div>
											)}
										</div>
										<div className="text-gray-400 flex flex-col items-start space-y-2 w-full">
											<div className="w-full">
												<p
													className=" text-slate-700 dark:text-white cursor-pointer line-clamp-1 w-fit overflow-hidden text-ellipsis first-letter:capitalize hover:underline"
													onClick={() => navigate(`/group/${group._id}`)}>
													{group?.groupName}
												</p>
												<p className="w-fit text-sm sm:text-base line-clamp-2 overflow-hidden text-ellipsis">
													{group?.groupDescription}
												</p>
											</div>
											<div className="flex flex-wrap items-center gap-2">
												<AvatarGroup total={group.groupMembers.length}>
													{group.groupMembers
														.slice(0, 3)
														.map((member, index) => (
															<Avatar
																key={index}
																src={member.profileimage}
																sx={{ width: 20, height: 20 }}
															/>
														))}
												</AvatarGroup>
												<p className="text-sm whitespace-nowrap">
													{group?.groupMembers?.length} member
													{group?.groupMembers?.length !== 1 && "s"}
												</p>
												<span>•</span>
												<div className="hover:underline decoration-dotted cursor-pointer whitespace-nowrap">
													{group.groupMembers.some(
														(member) => member?.userId === userId
													) ? (
														group.admin.userId === userId ? (
															<p className="text-sm">You created this group</p>
														) : (
															<p className="text-sm">You joined this group</p>
														)
													) : group.groupMembers?.length > 2 ? (
														<p className="text-sm">
															<span className="capitalize text-sm">
																{group.groupMembers[0]?.username},{" "}
																{group.groupMembers[1]?.username}{" "}
															</span>
															and {group.groupMembers.length - 2} others are
															members
														</p>
													) : (
														group.groupMembers.length !== 0 && (
															<p className="text-sm">
																<span className="capitalize text-sm">
																	{group.groupMembers[0]?.username}{" "}
																</span>
																is a member
															</p>
														)
													)}
												</div>
											</div>
											<p className="absolute text-xs top-0 right-0">
												Created {useDateFormatter(new Date(group.createdAt))}{" "}
												ago
											</p>
										</div>
									</div>
									{group.admin.userId !== userId && (
										<button
											onClick={() =>
												joinGroup(
													group._id,
													group.groupMembers.some(
														(member) => member.userId === userId
													)
												)
											}
											className="sm:absolute bottom-0 right-0 py-3 px-4 w-fit bg-blue-base rounded-full text-white hover:bg-blue-light transition">
											{group.groupMembers.some(
												(member) => member.userId === userId
											)
												? "Leave group"
												: "Join group"}
										</button>
									)}
								</div>
							</div>
						))}
				</section>
				{!userGroups && (
					<span className="capitalize text-2xl">
						{userData?.username} hasn't joined any groups yet
					</span>
				)}
				{!groups && <GroupLoader />}
			</div>
			{globalLoading && <Loading />}
		</div>
	);
};

export default GroupLayout;
