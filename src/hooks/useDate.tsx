import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

const useDateFormatter = (date: Date) => {
	return timeAgo.format(new Date(date), 'mini-now');
};

export default useDateFormatter;
