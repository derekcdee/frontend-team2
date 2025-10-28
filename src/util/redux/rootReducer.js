import userReducer from "./userReducer"
import cartReducer from "./cartReducer"
import featuredCuesReducer from "./featuredCuesReducer"
import announcementsReducer from "./announcementsReducer";
import { combineReducers } from "@reduxjs/toolkit/react";

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    featuredCues: featuredCuesReducer,
    announcements: announcementsReducer
});

export default rootReducer;