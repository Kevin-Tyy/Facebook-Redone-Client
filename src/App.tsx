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
import BottomNav from "./components/shared/Nav";
import Homelayout from "./layout/Homelayout";
import Loading from "./components/Loaders/fallback";

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
				<BottomNav />
				<Suspense fallback={<Loading/>}>
					<Routes>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/" element={<Homelayout />}>
							<Route
								index
								element={
									user?.loggedIn ? <HomePage /> : <Navigate to="/login" />
								}
							/>
							<Route
								path="/profile/:id"
								element={
									user?.loggedIn ? <Profile /> : <Navigate to="/login" />
								}
							/>
							<Route
								path="/friends"
								element={
									user?.loggedIn ? <FriendPage /> : <Navigate to="/login" />
								}
							/>
							<Route
								path="/chat"
								element={user?.loggedIn ? <Chat /> : <Navigate to="/login" />}
							/>

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
