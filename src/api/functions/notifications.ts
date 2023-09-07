import axios from "axios";
import { BaseURL } from "../../utils/Link";

const createNotification = (
	userId: string,
	message: string,
	link: string,
	users?: string[]
) => {
	axios
		.post(`${BaseURL}/notifications`, {
			userId,
			message,
			dateTime: new Date(),
			link,
			users: users ? users : [],
		})
		.then((response) => {
			console.log(response);
		})
		.catch((err) => {
			console.log(err);
		});
};

export default createNotification;
