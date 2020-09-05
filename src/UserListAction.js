import axios from "axios";

export const REQUEST_USERS = "REQUEST_USERS";
export const RECEIVE_USERS = "RECEIVE_USERS";

export const receiveUserItems = (userItems) => ({
  type: RECEIVE_USERS,
  userItems,
});

export const checkIsLoading = () => ({
  type: REQUEST_USERS,
});

export const requestUserItems = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3333/members")
      .then((x) => {
        const userItems = x.data;
        dispatch(receiveUserItems(userItems));
        console.log(userItems);
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
      });
  };
};
