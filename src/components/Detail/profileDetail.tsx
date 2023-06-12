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
			<div>
				<h1 className="text-light text-xl">Bio</h1>
				<p className="text-light">
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
			<div>
				<h1 className="text-light text-xl">Education</h1>
				<p className="text-light">
					{userData?.education
						? `Went to ${userData?.education}`
						: "No Education added"}
				</p>
				{userData?.userId == userId && (
					<div onClick={viewUpdateModal}>
						<ButtonComp color="#0C88EF">
							{userData?.bio ? "Edit Education " : "Add Education"}
						</ButtonComp>
					</div>
				)}
			</div>
			<div>
				<h1 className="text-light text-xl">Work</h1>
				<p className="text-light">
					{userData?.work ? `Works at ${userData?.work}` : "No Work added"}
				</p>
				{userData?.userId == userId && (
					<div onClick={viewUpdateModal}>
						<ButtonComp color="#0C88EF">
							{userData?.bio ? "Edit Work" : "Add Work"}
						</ButtonComp>
					</div>
				)}
			</div>
			<div>
				<h1 className="text-light text-xl">Location</h1>
				<p className="text-light">
					{userData?.location
						? `Lives ${userData?.location}`
						: "No location added"}
				</p>
				{userData?.userId == userId && (
					<div onClick={viewUpdateModal}>
						<ButtonComp color="#0C88EF">
							{userData?.location ? "Edit location  " : "Add location"}
						</ButtonComp>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfileDetail;
