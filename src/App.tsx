import React, { FC, Suspense, lazy, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";
import { loggedInUser } from "./redux/features/AuthSlice";
import { Toaster } from "react-hot-toast";
import FriendPage from "./pages/Friends";
import Homelayout from "./layout/Homelayout";
import Loading from "./components/Loaders/fallback";
import PageLayout from "./layout/PageLayout";

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
	const user = useSelector(loggedInUser) as User;
	return (
		<React.Fragment>
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
		</React.Fragment>
	);
};

export default App;
