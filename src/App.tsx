import React, { FC, Suspense, lazy } from "react";

// import Login from "./pages/Auth/Login";
// import HomePage from "./pages/Homepage/HomePage";
// import Register from "./pages/Auth/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import NotFound from "./pages/NotFound/NotFound";
// import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import { loggedInUser } from "./redux/features/AuthSlice";
import { Toaster } from "react-hot-toast";
import FriendPage from "./pages/Friends";
// import Chat from "./pages/Chat/Chat";
import Homelayout from "./layout/Homelayout";
import Loading from "./components/Loaders/fallback";
import Groups from "./pages/group";

const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const HomePage = lazy(() => import("./pages/Homepage/HomePage"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Chat = lazy(() => import("./pages/Chat/Chat"));
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
							<Route index element={<HomePage />} />
							<Route path="/profile/:id" element={<Profile />} />
							<Route path="/friends" element={<FriendPage />} />
							<Route path="/chat" element={<Chat />} />
							<Route path="/groups" element={<Groups />} />

							<Route
								path="/home"
								element={
									user?.loggedIn ? (
										<Navigate to="/" />
									) : (
										<Navigate to="/login" />
									)
								}
							/>
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
				<Toaster containerStyle={{ textAlign: "center" }} />
			</BrowserRouter>
		</React.Fragment>
	);
};

export default App;
