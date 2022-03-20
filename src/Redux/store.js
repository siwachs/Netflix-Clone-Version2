import { createStore, applyMiddleware, combineReducers } from "redux";

//Middleware
import thunk from "redux-thunk";

//visualizing Redux Store
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/auth.reducer";
import { subscriptionReducer } from "./reducers/subscription.reducer";

//combine
const rootReducer = combineReducers({
  authReducer: authReducer,
  subscriptionReducer: subscriptionReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
