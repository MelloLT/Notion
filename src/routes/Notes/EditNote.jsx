import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Api } from '../../utils/DataLoader';
import NoteForm from '../../components/NoteForm';
import { useCallback } from 'react';

export const loader = async ({ params: id }) => {
  try {
    const note = await Api.getNote(id);
    return { note };
  } catch (error) {
    console.error(error);
    throw new Response('', { status: 404 });
  }
};

function EditNote() {
  const { note } = useLoaderData();

  const navigate = useNavigate();

  const handleUpdateNote = useCallback(async ({ text, title }) => {
    try {
      const newNote = {
        title: title.trim(),
        text: text.trim(),
        authorId: note.authorId,
        date: note.date,
      };

      await Api.updateNote({ newNote, id: note.id });
      navigate(`/home/notes`);
    } catch (err) {
      console.log('Handle update error:', err.message);
    }
  }, []);

  return (
    <>
      <header className="grid grid-cols-6 mb-6">
        <Link
          to="/home/notes"
          className="no-underline col-span-1 prose prose-xl font-bold h-auto w-28 m-auto rounded-md bg-slate-300"
        >
          Back
        </Link>
        <div className="prose col-span-4 flex justify-center m-auto text-center">
          <h1>Edit note</h1>
        </div>
      </header>
      <NoteForm orig={note} onAction={handleUpdateNote} />
    </>
  );
}

export default EditNote;

{
  /* 
  <main className="flex flex-col gap-4 w-4/5 m-auto">
    <input
      type="text"
      name=""
      id=""
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
        setErrors(null);
      }}
      placeholder="Name"
    />
    <textarea
      id="story"
      name="story"
      placeholder="Note text..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      rows="5"
      cols="33"
    ></textarea>  
    <button onClick={handleUpdateNote}>
      Save
    </button>
    <div className="text-red-500 h-8">
      {errors?.title && errors.title._errors}
    </div>
  </main> 
*/
}
