import { createStore, combineReducers, applyMiddleware } from "redux";
import { UserListReducer } from "./UserListReducer";
import thunk from "redux-thunk";
export default function configureStore(preloadedState) {
  const rootReducer = combineReducers({
    UserListReducer: UserListReducer,
  });

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  );

  return store;
}
