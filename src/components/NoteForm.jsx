import React, { useState } from 'react';
import { Note } from '../utils/Validation';

function NoteForm({ orig, onAction }) {
  const [errors, setErrors] = useState(null);
  const [title, setTitle] = useState(orig.title);
  const [text, setText] = useState(orig.text);

  const handleSaveNote = async () => {
    try {
      Note.parse({
        title: title,
        text: text,
      });

      onAction({ title, text });
    } catch (err) {
      setErrors(err.format());
      console.log('Handle update error:', err.format());
    }
  };

  return (
    <main className="flex flex-col gap-4 w-4/5 m-auto">
      <input
        type="text"
        className="p-2 border border-stone-500 rounded-sm"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setErrors(null);
        }}
        placeholder="Name"
      />
      <textarea
        className="p-2 border border-stone-500 rounded-sm"
        placeholder="Note text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="5"
        cols="33"
      />

      <button
        className="prose prose-xl font-bold h-auto w-28 m-auto rounded-md bg-slate-300"
        onClick={handleSaveNote}
      >
        Save
      </button>
      <div className="text-red-500 h-8">
        {errors?.title && errors.title._errors}
      </div>
    </main>
  );
}

export default React.memo(NoteForm);
