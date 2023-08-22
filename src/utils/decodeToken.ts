import jwtDecode from "jwt-decode";
export const decodeToken = (token: string) => {
	return { userInfo: jwtDecode(token) };
};
