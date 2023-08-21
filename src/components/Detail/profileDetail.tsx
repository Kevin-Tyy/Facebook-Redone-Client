import { Userdata } from "../../types/Types";
import ButtonComp from "../Buttons/Button";
import Skeleton from "react-loading-skeleton";
interface Props {
	userId: string | undefined;
	userData: Userdata | null;
	setIsOpen: (value: boolean) => void;
	isOpen: boolean;
	loading: boolean;
}

const ProfileDetail = ({
	loading,
	isOpen,
	userId,
	userData,
	setIsOpen,
}: Props) => {
	const viewUpdateModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="flex flex-col gap-6">
			{loading ? (
				<div>
					<Skeleton height={40} />
					<Skeleton />
				</div>
			) : (
				<div className="flex gap-2">
					<div className="w-full">
						<h1 className="text-light ">Bio✍️</h1>
						<p className="text-white">
							{userData?.bio ? userData?.bio : "No bio added"}
						</p>
					</div>
					{userData?.userId == userId && (
						<div onClick={viewUpdateModal}>
							<ButtonComp color="#0C88EF">
								{userData?.bio ? "Edit Bio " : "Add bio"}
							</ButtonComp>
						</div>
					)}
				</div>
			)}
			{loading ? (
				<div>
					<Skeleton height={40} />
					<Skeleton />
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<h1 className="text-light ">Education👨‍🎓</h1>
					<div className="text-white">
						{userData?.education ? (
							<p>
								Went to{" "}
								<span className="underline capitalize">
									{userData?.education}
								</span>
							</p>
						) : (
							"No Education added"
						)}
					</div>
				</div>
			)}
			{loading ? (
				<div>
					<Skeleton height={40} />
					<Skeleton />
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<h1 className="text-light ">Work👜</h1>
					<p className="text-white">
						{userData?.work ? (
							<span>
								Works at{" "}
								<span className="underline capitalize">{userData?.work}</span>
							</span>
						) : (
							"No Work added"
						)}
					</p>
				</div>
			)}
			{loading ? (
				<div>
					<Skeleton height={40} />
					<Skeleton />
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<h1 className="text-light ">Location🏠</h1>
					<p className="text-white">
						{userData?.location ? (
							<span>
								From{" "}
								<span className="underline capitalize">
									{userData?.location}
								</span>
							</span>
						) : (
							"No location added"
						)}
					</p>
				</div>
			)}
			{userData?.userId == userId && (
				<div onClick={viewUpdateModal} className="max-w-[100px]">
					<ButtonComp color="#0C88EF">Edit details</ButtonComp>
				</div>
			)}
			<hr className="border-1 border-gray-700 mt-4" />
			<p className="text-le px-3 text-gray-400 text-sm max-w-sm">
				Your friends will be able to recognize you easily if you add more
				details about yourself
			</p>
			<p className="text-le px-3 text-gray-400 text-sm max-w-sm">
				facebook @2023 copyright &copy; all rights reserved
			</p>
		</div>
	);
};

export default ProfileDetail;
