// import { CloseRounded, Search } from "@mui/icons-material";
// import React, { useRef } from "react";
// import { useSelector } from "react-redux";
// import { currentTheme } from "../../redux/features/ThemeSlice";
// import SearchPopup from "./SearchPopup";

// interface Props {
// 	mobileSearch: boolean;
// 	setMobileSearch: () => void;
//   setSearchKey: (key: string) => void;
//   setSearchPopupOpen: () => void;
//   searchPopupOpen: boolean;

// }
// const MobileNav:React.FC<Props> = ({ mobileSearch, setMobileSearch, setSearchKey, setSearchPopupOpen ,  searchPopupOpen}) => {
//   const mobileSearchRef = useRef<HTMLDivElement>(null);
// 	const { theme } = useSelector(currentTheme);

// 	return (
// 		<div
// 			ref={mobileSearchRef}
// 			className={`${
// 				mobileSearch && "bg-white dark:bg-primary-100 "
// 			} absolute right-14 duration-500 flex items-center gap-3 p-1 focus-within:ring-1 focus-within:ring-slate-400/30 dark:focus-within:ring-gray-600 focus-within:ring-inset overflow-hidden rounded-full w-12 xl:w-[300px] transition-all pl-4 ${
// 				mobileSearch && "max-w-full w-[90%]"
// 			}`}>
// 			<Search
// 				sx={{
// 					color: theme === "dark" ? "#e5e5e5" : "#475569",
// 					cursor: "pointer",
// 				}}
// 				onClick={() => setMobileSearch(true)}
// 			/>
// 			<input
// 				type="text"
// 				className="w-full bg-transparent outline-none text-slate-700 dark:text-white"
// 				placeholder="Search facebook"
// 				onChange={(e) => {
// 					setSearchKey(e.target.value);
// 					setSearchPopupOpen(true);
// 				}}
// 			/>
// 			{searchPopupOpen && searchKey && (
// 				<SearchPopup
// 					searchKey={searchKey}
// 					onClose={() => setSearchPopupOpen(false)}
// 				/>
// 			)}
// 			<CloseRounded
// 				sx={{ fontSize: 35 }}
// 				className="text-slate-600 cursor-pointer dark:text-white bg-slate-200 dark:bg-gray-500 p-2 rounded-full"
// 				onClick={() => setMobileSearch(false)}
// 			/>
// 		</div>
// 	);
// };

// export default MobileNav;
