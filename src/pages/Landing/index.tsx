import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentTheme } from "../../redux/features/ThemeSlice";
import dummyImage from "../../assets/person1.jpeg";
import Contact from "./components/Contact";
const Landing = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 10) {
				return setIsScrolled(true);
			}
			return setIsScrolled(false);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.addEventListener("scroll", handleScroll);
		};
	}, []);
	const { theme } = useSelector(currentTheme);
	return (
		<div className="bg-white dark:bg-primary-200">
			<div
				className={`flex items-center sticky top-0 bg-white dark:bg-primary-200 p-4 justify-between transition duration-1000 ${
					isScrolled && "shadow-lg"
				}`}>
				<h1
					className={`
						 text-blue-500 font-black text-3xl select-none transition duration-500 font-sans`}>
					facebook
				</h1>
				<div className="flex items-start gap-x-4">
					<Button
						onClick={() => navigate("/register")}
						sx={{
							color: "#0C88EF",
							backgroundColor: "#fff",
							textTransform: "capitalize",
							borderRadius: "40px",
							alignSelf: "flex-start",
							px: "25px",
							py: "10px",
							"&:hover": {
								boxShadow: theme === "light" ? "0 5px 10px #e1e1e1" : "",
								bgcolor: "white",
							},
						}}>
						Join now
					</Button>
					<Button
						onClick={() => navigate("/login")}
						sx={{
							color: "white",
							backgroundColor: "#0C88EF",
							textTransform: "capitalize",
							borderRadius: "40px",
							alignSelf: "flex-start",
							px: "25px",
							py: "10px",
							"&:hover": { backgroundColor: "#3293e3" },
						}}>
						Sign in
					</Button>
				</div>
			</div>
			<div className="p-5 sm:p-10 text-white mb-5">
				<h1 className="text-3xl mb-4">Lorem ipsum dolor sit amet consectetur.</h1>
				<p className="text-gray-400">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt tempore
					natus accusamus facere iusto cupiditate, dolore, at quasi error vero
					exercitationem explicabo quaerat temporibus, fugit alias deleniti ut
					sit! Commodi ad tempora cumque libero fuga quasi, laboriosam omnis!
					Consectetur inventore quam enim laudantium, possimus quaerat
					architecto eaque repellat officiis distinctio, omnis sint doloribus. A
					similique quo beatae, numquam temporibus architecto. Voluptate impedit
					quod quidem blanditiis possimus inventore asperiores consectetur ut
					optio totam, recusandae, error fugiat. Quod quaerat, optio voluptatem
					recusandae perferendis itaque veritatis voluptate quas quidem
					dignissimos asperiores consequuntur dolores provident dolorum ex
					tempora. Error cumque distinctio eos quia dicta.
				</p>
			</div>
			<div className="flex flex-col gap-10 sm:gap-10 mb-10">
				<h1 className="text-white text-center text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing.</h1>
				{Array(5)
					.fill(null)
					.map((_, index) => (
						<div
							key={index}
							className={`flex p-7 md:max-w-7xl 2xl:max-w-[65%] mx-auto flex-col items-center gap-5 sm:gap-10 ${
								index % 2 === 0 ? "lg:flex-row " : "lg:flex-row-reverse"
							}`}>
							<div className="flex flex-col gap-10">
								<h1 className="text-3xl text-white text-center">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Distinctio.
								</h1>
								<p className="text-gray-400 leading-7">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
									vitae fugiat quae nesciunt voluptas laborum maxime sed a
									magnam, eveniet est delectus dicta quod excepturi ducimus?
									Quisquam quos libero voluptatibus iusto repellendus nam animi
									sit, soluta laudantium, incidunt dolores fugiat maiores
									repellat non eos dolorum nihil excepturi dolore possimus
									consectetur magnam velit ab provident. Blanditiis explicabo,
									tempora fugiat inventore dolorem nisi similique at sequi
									molestias amet. Laborum soluta sequi nam dolores. Nemo
									provident amet vel nisi facere asperiores repellendus
									voluptate natus fugiat quasi ducimus cum reprehenderit
									incidunt nihil maxime recusandae animi officiis ipsum fuga,
									cumque distinctio modi, nobis quos consequuntur?
								</p>
							</div>
							<img
								src={dummyImage}
								alt="image"
								className="w-full object-cover sm:w-[400px] h-[300px] rounded-xl"
							/>
						</div>
					))}
			</div>
			<div>
				<Contact/>
			</div>
		</div>
	);
};

export default Landing;
