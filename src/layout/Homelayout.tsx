import { Outlet } from "react-router-dom";
import Navbar from "../components/Nav";

const Homelayout = () => {
	return (
		<div>
			<Navbar />
			<Outlet />
		</div>
	);
};

export default Homelayout;
