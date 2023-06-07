import Navbar from "../../components/Nav";
import bgImage from "../../assets/noman.jpg";
type Props = {};

const profile = () => {
	return (
		<div className="h-screen w-full bg-gray-950 ">
			<Navbar />
			<div>
				<div
					className="relative bg-no-repeat bg-cover bg-center bg-[url('../src/assets/noman.jpg')] flex flex-col items-center h-[35vh] p-20 justify-center	">
						<div className="flex flex-col absolute top-72 justify-center">
							<div className="bg-gradient-to-r from-violet-800 to-sky-500 rounded-full p-[5px]">
								<div className="bg-black rounded-full p-[5px]">
									<img src={bgImage} className="w-44 h-44 rounded-full"/>

								</div>

							</div>

							<p>John Smith</p>

						</div>
				</div>
				<div className="flex justify-center">
					<div className="bg-primary-200 h-[200px] w-full md:w-[85%] rounded-b-3xl">
						hello
					</div>

				</div>
			</div>
		</div>
	);
};

export default profile;
