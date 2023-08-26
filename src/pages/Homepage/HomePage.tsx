import { FC } from "react";
import Posts from "../../components/Posts";
import Stories from "../../components/Posts/Story";

const Body: FC = () => {
	return (
		<div className="h-full w-full min-h-[100vh] max-w-[700px] flex flex-col gap-3 sm:gap-6">
			<Stories />
			<Posts />
		</div>
	);
};

export default Body;
