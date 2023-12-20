import React, { useCallback, useContext, useState } from "react";
import { Api } from "../../utils/DataLoader";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContextProvider";
import NoteForm from "../../components/NoteForm";

function NewNote() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSetNote = useCallback(async ({ title, text }) => {
    try {
      const newNote = {
        title: title.trim(),
        text: text.trim(),
        authorId: user.id,
        date: Date.now(),
      };

      await Api.setNote({ newNote });
      navigate(`/home/notes`);
    } catch (err) {
      setErrors(err.format());
      console.error("Handle update error:", err.message);
    }
  }, []);

  return (
    <>
      <header className="grid grid-cols-6 mb-4">
        <Link
          to="/home/notes"
          className="no-underline col-span-1 prose prose-xl font-bold h-auto w-28 m-auto rounded-md bg-slate-300"
        >
          Back
        </Link>

        <div className="prose col-span-4 flex justify-center m-auto">
          <h1>Create new note</h1>
        </div>
      </header>
      <NoteForm orig={{ title: "", text: "" }} onAction={handleSetNote} />
    </>
  );
}

export default NewNote;
