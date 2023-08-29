import Modal from "../../Modals";
import placeholderImage from '../../../assets/avatar.webp'
interface Props {
	profileimage: string;
	username: string;
	email: string;
	isOpen: boolean;
	onClose: () => void;
}
const ProfileImage = ({
	email,
	isOpen,
	onClose,
	profileimage,
	username,
}: Props) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="relative w-[600px] bg-primary-200 rounded-md py-4">
				<div className="p-1">
					<div className="p-2">
						<p className="capitalize text-light text-center text-xl">
							{username} <span>Updated his profile picture</span>
						</p>
					</div>
					<hr className="border-[1px] border-gray-800 " />
					<div className="flex gap-2 items-center p-3">
						<div className="bg-primary-100 p-[3px] rounded-full">
							<img
								src={profileimage || placeholderImage}
								className="h-[50px] w-[50px] rounded-full"
							/>
						</div>
						<div>
							<p className="capitalize text-light text-left">{username}</p>
							<p className="text-gray-400/90">{email}</p>
						</div>
					</div>
				</div>
				<img src={profileimage || placeholderImage} className="w-full h-full" />
			</div>
		</Modal>
	);
};

export default ProfileImage;
