import { Link } from "react-router-dom";
import image from "../../assets/notfound.png";
const NotFound = () => {
	document.title = "Page Not Found";
	return (
		<div className="bg-background-primary min-h-screen w-full flex justify-center items-center pb-52">
			<div className="flex flex-col justify-center items-center gap-4 select-none">
				<img src={image}  className="h-72"/>

				<h2 className="text-gray-600 text-lg">
					Return to the{" "}
					<Link to="/i/flow" className="hover:underline">
						Homepage
					</Link>
				</h2>
			</div>
		</div>
	);
};

export default NotFound;
