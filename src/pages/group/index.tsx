import { useEffect, useState } from "react";
import CreateModal from "./components/CreateModal.jsx";
import axios from "axios";
import { BaseURL } from "../../utils/Link.js";
import { GroupType, UserInfo } from "../../types/Types.js";
import useDateFormatter from "../../hooks/useDate.js";
import Loading from "../../components/shared/loading.js";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice.js";
import { HiUserGroup } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const Groups = () => {
	const [groups, setGroups] = useState<GroupType[] | null>(null);
	const [createGroup, setCreateGroup] = useState(false);
	const [limit, setLimit] = useState(5);
	const [globalLoading, setGlobalLoading] = useState(false);
	const navigate = useNavigate();
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
	useEffect(() => {
		fetchGroups();
	}, []);
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
		<div className="h-full min-h-[100vh] w-full max-w-[750px] sm:min-w-[600px]">
			<div className="mb-4 group w-fit cursor-default">
				<h1 className="text-white text-xl mb-1 flex items-center gap-2">
					Groups
					<HiUserGroup size={20} />
				</h1>
				<div className="w-10 h-1 bg-blue-base rounded-full mt-1 group-hover:w-full transition-all duration-300"></div>
			</div>
			<header className="p-8 mb-4 flex gap-20 justify-between items-end bg-primary-200 rounded-xl">
				<p className="text-white after:absolute after:'' ">
					Groups, a new way to organize your posts and discussions <br />
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, laborum.
				</p>
				<button
					onClick={() => setCreateGroup(true)}
					className="bg-white whitespace-nowrap  p-3 rounded-full flex items-center gap-2">
					<HiUserGroup size={20} />
					Create a group
				</button>
			</header>
			<section className="flex flex-col gap-2">
				<div className="mb-4 group w-fit cursor-default">
					<h1 className="text-white text-lg mb-3">Groups you may like.</h1>
					<div className="w-20 h-1 bg-blue-base rounded-full mt-1 group-hover:w-full transition-all duration-300"></div>
				</div>
				{!groups && (
					<div className="w-full h-[50vh] flex items-center justify-center">
						<CircularProgress size={20} />
					</div>
				)}
				{groups?.length === 0 && (
					<div className="bg-primary-200 text-white rounded-xl p-10 grid place-content-center">
						<p className="flex flex-col items-center gap-2">
							<HiUserGroup size={30} />
							No groups
						</p>
					</div>
				)}
				{groups?.slice(0, limit)?.map((group, index) => (
					<div
						key={index}
						className="text-white rounded-lg bg-primary-200 hover:bg-primary-100/60 p-6">
						<div className="relative flex gap-5 items-center">
							<div
								onClick={() => navigate(`/group/${group._id}`)}
								className="cursor-pointer">
								{group?.groupImage ? (
									<img
										src={group?.groupImage}
										alt=""
										className="w-[120px] rounded-md h-[120px] object-cover"
									/>
								) : (
									<div className="w-[120px] h-[120px] grid place-content-center bg-gradient-to-br from-purple-700 rounded-md to-gray-400">
										<HiUserGroup size={40} />
									</div>
								)}
							</div>
							<div className="text-gray-400 space-y-2">
								<p
									className="text-white cursor-pointer"
									onClick={() => navigate(`/group/${group._id}`)}>
									{group?.groupName}
								</p>
								<p>{group?.groupDescription}</p>
								<div className="flex gap-2">
									<p className="text-sm">
										{group?.groupMembers?.length} member
										{group?.groupMembers?.length !== 1 && "s"}
									</p>
									<span>•</span>
									<div className="hover:underline decoration-dotted cursor-pointer">
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
												and {group.groupMembers.length - 2} others are members
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
									Created {useDateFormatter(new Date(group.createdAt))} ago
								</p>
							</div>
							<button
								onClick={() =>
									joinGroup(
										group._id,
										group.groupMembers.some(
											(member) => member.userId === userId
										)
									)
								}
								className="absolute bottom-0 right-0 py-3 px-4 bg-blue-base rounded-full hover:bg-blue-light transition">
								{group.groupMembers.some((member) => member.userId === userId)
									? "Leave group"
									: "Join group"}
							</button>
						</div>
					</div>
				))}
			</section>
			{groups && groups.length !== 0 && (
				<button
					className="bg-white py-3 px-6 rounded-full m-4"
					onClick={() => setLimit(limit + 5)}>
					See more
				</button>
			)}
			<CreateModal
				isOpen={createGroup}
				onClose={() => setCreateGroup(false)}
				fetchGroups={fetchGroups}
			/>
			{globalLoading && <Loading />}
		</div>
	);
};

export default Groups;
