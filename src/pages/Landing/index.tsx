import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentTheme } from "../../redux/features/ThemeSlice";

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
		<div className="bg-white">
			<div
				className={`flex items-center sticky top-0 bg-white dark:bg-primary-200 p-4 justify-between transition duration-1000 ${
					isScrolled && "shadow-xl"
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
			<div className="h-screen">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
				explicabo, sequi quae, hic nostrum fuga velit quia dignissimos, itaque
				id recusandae eveniet vero deserunt aliquid ipsa corrupti voluptatum
				alias est!
			</div>
      
		</div>
	);
};

export default Landing;
