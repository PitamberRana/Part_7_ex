import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null, type: null },
  reducers: {
    setNotification(state, action) {
      const content = action.payload;
      return {
        message: content.message,
        type: content.type,
      };
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
