import { Outlet } from "react-router-dom";
import Navbar from "../components/Nav";
// import BottomNav from "../components/shared/Nav";

const Homelayout = () => {
	return (
		<div>
			<Navbar />
			{/* <BottomNav /> */}
			<Outlet />
		</div>
	);
};

export default Homelayout;
