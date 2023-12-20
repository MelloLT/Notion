// actions.js

export const SET_NOTE = "SET_NOTE";
export const GET_NOTES = "GET_NOTES";
export const DELETE_NOTE = "DELETE_NOTE";

export const setNote = (newNote) => ({
  type: SET_NOTE,
  payload: newNote,
});

export const getNotes = (userId) => ({
  type: GET_NOTES,
  payload: userId,
});

export const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  payload: noteId,
});
