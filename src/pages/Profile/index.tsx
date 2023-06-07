import Navbar from "../../components/Nav";
import bgImage from "../../assets/noman.jpg";
type Props = {};

const profile = () => {
	return (
		<div className="h-screen w-full bg-gray-950 ">
			<Navbar />
			<div>
				<div
					className="bg-no-repeat bg-cover bg-center
		bg-[url('../src/assets/noman.jpg')]
">
					F{/* <img src={bgImage} className="w-60 rounded-full h-60 " /> */}
				</div>
			</div>
		</div>
	);
};

export default profile;
