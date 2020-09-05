export const REQUEST_USERS = "REQUEST_USERS";
export const RECEIVE_USERS = "RECEIVE_USERS";

const initialState = {
  userItems: [],
  isloading: true,
};

export const UserListReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USERS:
      return {
        ...state,
        isloading: true,
      };
    case RECEIVE_USERS:
      return {
        ...state,
        userItems: action.userItems,
        isloading: false,
      };

    default:
      return state;
  }
};
