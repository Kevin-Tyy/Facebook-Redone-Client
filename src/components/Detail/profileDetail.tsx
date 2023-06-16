import { Userdata } from "../../types/Types";
import ButtonComp from "../Buttons/Button";
interface Props {
	userId: string | undefined;
	userData: Userdata | null;
	setIsOpen: (value: boolean) => void;
	isOpen: boolean;
}

const ProfileDetail = ({ isOpen, userId, userData, setIsOpen }: Props) => {
	const viewUpdateModal = () => {
		setIsOpen(!isOpen);
	};
	
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-light text-xl">Bio✍️</h1>
				<p className="text-gray-400">
					{userData?.bio ? userData?.bio : "No bio added"}
				</p>
				{userData?.userId == userId && (
					<div onClick={viewUpdateModal}>
						<ButtonComp color="#0C88EF">
							{userData?.bio ? "Edit Bio " : "Add bio"}
						</ButtonComp>
					</div>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-light text-xl">Education👨‍🎓</h1>
				<p className="text-gray-400">
					{userData?.education
						? <p>Went to <span className="underline">{userData?.education}</span></p>
						: "No Education added"}
				</p>
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-light text-xl">Work👜</h1>
				<p className="text-gray-400">
					{userData?.work ? <span>Works at <span className="underline">{userData?.work}</span></span> : "No Work added"}
				</p>
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-light text-xl">Location🏠</h1>
				<p className="text-gray-400">
					{userData?.location
						? <p>Edit details <span className="underline">{userData?.location}</span></p>
						: "No location added"}
				</p>
			</div>
			{userData?.userId == userId && (
				<div onClick={viewUpdateModal}>
					<ButtonComp color="#0C88EF">
						{userData?.location ? "Edit details  " : "Add details"}
					</ButtonComp>
				</div>
			)}
			<hr className="border-1 border-gray-700 mt-4"/>
			<p className="text-center px-3 py-1 text-gray-400">
				Your friends will be able to recognize you easily if you add more
				details about yourself
			</p>
		</div>
	);
};

export default ProfileDetail;
