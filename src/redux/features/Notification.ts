import { createSlice } from "@reduxjs/toolkit";
interface NotificationType {
	message: string;
	isSeen: boolean;
	dateTime: Date;
	link : string;
}
const notifications: NotificationType[] = [];

const NotificationSlice = createSlice({
	name: "notifications",
	initialState: notifications,
	reducers: {
		addNotification: (state, { payload }) => {
			state.push(payload);
		}
	},
});

export const { addNotification } =
	NotificationSlice.actions;
export default NotificationSlice.reducer;
export const myNotifications = (state: any) => state.notifications;
