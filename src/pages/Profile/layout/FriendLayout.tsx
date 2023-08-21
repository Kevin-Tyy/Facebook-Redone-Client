import { UserInfo, Userdata } from "../../../types/Types";
import FriendLoader from "../../../components/Loaders/Skeleton/FriendPageLoader";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/features/AuthSlice";

interface Props {
	friends: Userdata[];
	userData: Userdata;
}
const FriendLayout = ({ friends, userData }: Props) => {
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: Userdata } };

	const refreshPage = (user: UserInfo) => {
		document.location = `/profile/${user?.userId}`;
	};

	return (
		<div>
			{friends ? (
				<div className="flex flex-col gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800">
					<h1 className="text-light text-2xl text-center capitalize">
						{userData?.userId == userId ? "Your " : userData?.username + "'s"}{" "}
						friends{" "}
						<span className="text-primary-100">({friends?.length})</span>
					</h1>
					{friends.length > 0 ? (
						<div className="flex flex-col gap-6">
							{friends.map((user, index) => (
								<div
									className="bg-primary-200 p-4 rounded-lg border border-gray-800"
									key={index}>
									<div className="flex flex-col sm:flex-row items-center gap-4">
										<div
											className="bg-gradient-to-r from-sky-600 to-violet-900 rounded-full p-1"
											onClick={() => refreshPage(user)}>
											<div className="bg-primary-200 rounded-full p-1">
												<img
													src={user.profileimage}
													className="w-32 h-32 min-h-[130px] min-w-[130px] object-cover rounded-full"
												/>
											</div>
										</div>
										<div className="flex flex-col gap-1 w-full">
											<div onClick={() => refreshPage(user)}>
												<p className="text-xl text-white capitalize">
													{user.username}
												</p>
												<p className="text-light">{user.email}</p>
											</div>
											<p className="text-gray-500">{user.bio}</p>
											<div className="flex flex-col md:flex-row w-full gap-3">
												<div
													onClick={() => refreshPage(user)}
													className="w-full">
													<button className="text-light border p-2 border-gray-700 max-w-[300px] w-full h-full rounded-md hover:bg-gray-700/20">
														View profile
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-base text-center text-light/60 pb-6">
							😞 You have no friends!
						</div>
					)}
				</div>
			) : (
				<FriendLoader />
			)}
		</div>
	);
};

export default FriendLayout;
