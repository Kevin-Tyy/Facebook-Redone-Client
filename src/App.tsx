import React from "react";

import Login from "./pages/Auth/Login";
import HomePage from "./pages/Homepage/HomePage";
import Register from "./pages/Auth/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Posts from "./components/Posts";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import { loggedInUser } from "./redux/features/AuthSlice";
import { Toaster } from "react-hot-toast";
import FriendPage from "./pages/Friends";
import Chat from "./pages/Chat/Chat";
import BottomNav from "./components/shared/Nav";
interface User {
	loggedIn?: boolean;
}
const App = () => {
	const user = useSelector(loggedInUser) as User;

	return (
		<React.Fragment>
			<BrowserRouter>
			<BottomNav/>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/home"
						element={user?.loggedIn ? <HomePage /> : <Navigate to="/login" />}
					/>
					<Route
						path="/posts"
						element={user?.loggedIn ? <Posts /> : <Navigate to="/login" />}
					/>
					<Route
						path="/profile/:id"
						element={user?.loggedIn ? <Profile /> : <Navigate to="/login" />}
					/>
					<Route
						path="/friends"
						element={user?.loggedIn ? <FriendPage /> : <Navigate to="/login" />}
					/>
					<Route
						path="/chat"
						element={user?.loggedIn ? <Chat /> : <Navigate to="/login" />}
					/>

					<Route
						path="/"
						element={
							user?.loggedIn ? (
								<Navigate to="/home" />
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Toaster containerStyle={{ textAlign: "center" }} />
			</BrowserRouter>
		</React.Fragment>
	);
};

export default App;
