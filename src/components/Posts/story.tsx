import { Add } from "@mui/icons-material";
import { useState } from "react";
import StoryModal from "../Modals/storyModal";
interface Props {
	userInfo : Object
}

const Story = ({ userInfo }: Props) => {
	const [isToggled, setIsToggled] = useState(false);

	const handleStoryToggle = () => {
		setIsToggled(!isToggled);
	};
	return (
		<div className="w-full mb10">
			<div className="bg-primary-200 w-48 h-64 flex justify-center items-center rounded-md ">
				<div onClick={handleStoryToggle}  className="bg-primary-100 p-2 rounded-md cursor-pointer">
					<Add fontSize="medium"/>
				</div>
			</div>
			{isToggled && <StoryModal handleStoryToggle={handleStoryToggle} userInfo={userInfo}/>}
		</div>
	);
};

export default Story;
