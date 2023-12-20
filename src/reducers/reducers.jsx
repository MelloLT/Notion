// reducers.js

import { combineReducers } from "redux";
import { SET_NOTE, GET_NOTES, DELETE_NOTE } from "./actions";

const initialState = {
  notes: [],
};

const notesReducer = (state = initialState.notes, action) => {
  switch (action.type) {
    case SET_NOTE:
      return [...state, action.payload];
    case GET_NOTES:
      // Simulating an API call to get notes by user ID
      return /* Call your API and return the fetched notes */;
    case DELETE_NOTE:
      return state.filter((note) => note.id !== action.payload);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  notes: notesReducer,
});

export default rootReducer;
