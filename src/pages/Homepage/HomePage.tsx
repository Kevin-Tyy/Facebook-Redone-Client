import LeftSidebar from "../../components/SideBar/SideLeft";
import RightSidebar from "../../components/SideBar/SideRight";
import Body from "../../components/Body";

const HomePage = () => {
	document.title = "Facebook | Home";
	return (
		<div className="bg-background-primary h-auto w-full ">
			<div className="h-full flex justify-center gap-6 p-2 pt-6 md:p-6">
				<LeftSidebar />
				<Body />
				<RightSidebar />
			</div>
		</div>
	);
};

export default HomePage;
