import { Link } from "react-router-dom";
import bgImage from "../../assets/bg-cover.jpg";

const NotFound = () => {
	document.title = "Page Not Found";
	return (
		<div>
			<img
				src={bgImage}
				className="absolute top-0 left-0 right-0 bottom-0 h-screen w-full object-cover z-[-2]"
			/>
			<div className="fixed bottom-0 z-[-1] h-screen w-full bg-gradient-to-b from-black/10 via-black/70 to-black"></div>

			<div className="bg-gradient-to-r from-gray-900/40 via-gray-900 to-gray-950 h-screen w-full flex justify-center items-center pb-52">
				<div className="flex flex-col justify-center items-center gap-4">
					<h1 className="text-white text-2xl">
						Oops ! The page you are looking for is not available
					</h1>
					<h2 className="text-gray-600 text-lg">
						Return to the{" "}
						<Link to="home" className="hover:underline">
							Homepage
						</Link>
					</h2>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
