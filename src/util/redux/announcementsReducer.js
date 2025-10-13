import * as actionTypes from "./actionTypes";

const initialState = {
    items: [],
    loading: false,
    lastFetched: null
};

export default function announcementsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_ANNOUNCEMENTS:
            return {
                ...state,
                items: action.items,
                loading: false,
                lastFetched: Date.now()
            };
        case actionTypes.SET_ANNOUNCEMENTS_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        default:
            return state;
    }
}