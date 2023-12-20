import React, { Suspense, useContext, useEffect } from "react";
import { useState } from "react";
import { Await, Link } from "react-router-dom";
import { Api } from "../../utils/DataLoader";
import { UserContext } from "../../components/UserContextProvider";
import { CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DateFormat from "../../utils/DateFormat";

function Notes() {
  const [notesPromise, setNotes] = useState(new Promise(() => {}));
  const { user } = useContext(UserContext);

  const fetchNotes = () => {
    try {
      setNotes(Api.getNotes({ id: user.id }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    try {
      await Api.deleteNote({ id });
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <header className="prose mx-auto my-4 flex justify-center">
        <h1 className="">Notes</h1>
      </header>
      <main className="flex flex-col gap-4">
        <Link
          to="/home/newNote"
          className="no-underline block col-span-1 prose prose-xl font-bold h-auto w-max m-auto rounded-md bg-slate-300 p-1"
        >
          Add new note
        </Link>
        <Suspense
          fallback={<CircularProgress sx={{ mx: "auto", my: "4rem" }} />}
        >
          <Await
            resolve={notesPromise}
            errorElement={
              <div className="prose">Oops, something went wrong</div>
            }
          >
            {(notes) => {
              notes.sort((a, b) => new Date(b.date) - new Date(a.date));
              return (
                <div className="flex flex-col gap-2 justify-center">
                  {notes.length > 0 ? (
                    notes.map((note) => (
                      <div
                        className="flex flex-row bg-slate-300 w-4/5 justify-between m-auto px-4 py-0.5 min-h-[3rem] rounded-md"
                        key={note.id}
                      >
                        <article className="flex flex-row gap-2 my-auto">
                          <h4 className="font-bold">{note.title}</h4>
                          <h4 className="font-light">
                            {DateFormat({ date: note.date })}
                          </h4>
                        </article>
                        <div className="flex flex-row gap-4">
                          <button>
                            <Link
                              to={`/home/notes/${note.id}`}
                              className="prose"
                            >
                              <h4>
                                <EditIcon />
                              </h4>
                            </Link>
                          </button>

                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="prose"
                          >
                            <h4>
                              <DeleteIcon />
                            </h4>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>You don't have notes</div>
                  )}
                </div>
              );
            }}
          </Await>
        </Suspense>
      </main>
    </div>
  );
}

export default Notes;
