import { Outlet } from "react-router-dom";
import SideRight from "../components/SideBar/SideRight";
import Sidebar from "../components/SideBar/SideLeft";

const PageLayout = () => {
	return (
		<main className="min-h-screen bg-white dark:bg-background-primary">
			<section className="p-2 2xl:p-0 flex 2xl:justify-center">
				<section className="w-full pt-2 flex justify-center gap-6">
					<Sidebar />
					<Outlet />
					<SideRight />
				</section>
			</section>
		</main>
	);
};

export default PageLayout;
