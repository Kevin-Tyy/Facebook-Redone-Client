import { Outlet } from "react-router-dom";
import SideRight from "../components/SideBar/SideRight";
import Sidebar from "../components/SideBar/SideLeft";

const PageLayout = () => {
	return (
		<main className="min-h-screen bg-background-primary">
			<section className="p-2 md:p-10 2xl:p-0 flex 2xl:justify-center">
				<section className="w-full pt-6 flex justify-center gap-6">
					<Sidebar />
					<Outlet />
					<SideRight />
				</section>
			</section>
		</main>
	);
};

export default PageLayout;