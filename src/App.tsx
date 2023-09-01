import React, { FC, Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "./redux/features/AuthSlice";
import { Toaster } from "react-hot-toast";
import FriendPage from "./pages/Friends";
import Homelayout from "./layout/Homelayout";
import Loading from "./components/Loaders/fallback";
import PageLayout from "./layout/PageLayout";
import { currentTheme, toggleTheme } from "./redux/features/ThemeSlice";
import { SkeletonTheme } from "react-loading-skeleton";

const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const HomePage = lazy(() => import("./pages/Homepage/HomePage"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Chat = lazy(() => import("./pages/Chat/Chat"));
const Saved = lazy(() => import("./pages/Saved"));
const GroupPage = lazy(() => import("./pages/group/pages"));
const Groups = lazy(() => import("./pages/group"));
interface User {
	loggedIn?: boolean;
}
const App: FC = () => {
	const element = document.documentElement;
	const { theme } = useSelector(currentTheme);
	const dispatch = useDispatch();
	console.log(theme);
	//use browser window to check prefered color scheme
	const queryTheme = window.matchMedia("(prefers-color-scheme:dark)");

	const onWindowMatch = () => {
		if (theme === "system" && queryTheme.matches) {
			element.classList.add("dark");
			dispatch(toggleTheme("dark"));
		} else {
			element.classList.remove("dark");
			dispatch(toggleTheme("light"));
		}
	};
	useEffect(() => {
		onWindowMatch();
	}, [theme]);
	
	useEffect(() => {
		switch (theme) {
			case "dark":
				element.classList.add("dark");
				dispatch(toggleTheme("dark"));
				break;
			case "light":
				element.classList.remove("dark");
				dispatch(toggleTheme("light"));
				break;
			default:
				dispatch(toggleTheme("system"));
				onWindowMatch();
				break;
		}
	}, [theme]);
	const user = useSelector(loggedInUser) as User;

	return (
		<React.Fragment>
			<SkeletonTheme
				baseColor={theme === "dark" ? "#1d1d2e" : "#b3b3c5"}
				highlightColor={theme === "dark" ? "#2a2a3d" : "#d3d3e9"}>
				<BrowserRouter>
					<Suspense fallback={<Loading />}>
						<Routes>
							<Route path="/register" element={<Register />} />
							<Route path="/login" element={<Login />} />
							<Route
								path="/"
								element={
									user?.loggedIn ? <Homelayout /> : <Navigate to="/login" />
								}>
								<Route path="/i" element={<PageLayout />}>
									<Route path="flow" element={<HomePage />} />
									<Route path="friends" element={<FriendPage />} />
									<Route path="groups" element={<Groups />} />
									<Route path="saved" element={<Saved />} />
								</Route>
								<Route path="chat" element={<Chat />} />
								<Route path="group/:id" element={<GroupPage />} />
								<Route path="profile/:id" element={<Profile />} />
							</Route>
							<Route
								path="home"
								element={
									user?.loggedIn ? (
										<Navigate to="/i/flow" />
									) : (
										<Navigate to="/login" />
									)
								}
							/>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Suspense>
					<Toaster containerStyle={{ textAlign: "center" }} />
				</BrowserRouter>
			</SkeletonTheme>
		</React.Fragment>
	);
};

export default App;
