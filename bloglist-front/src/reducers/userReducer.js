import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUsers(state, action) {
      const user = action.payload;

      return user;
    },
  },
});

export const setUserObject = (user) => {
  return async (dispatch) => {
    dispatch(setUsers(user));
  };
};

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
