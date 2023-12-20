import { useContext } from 'react';
import { UserContext } from '../components/UserContextProvider';
import { Link } from 'react-router-dom';

function About() {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex-col my-4 w-full">
        <header className="prose mx-auto my-4 flex justify-center">
          <h1 className="">About me</h1>
        </header>
        <main className="mt-5 mx-auto flex-col  gap-3">
          <div className="flex justify-center">
            <p className="font-bold">Email:&nbsp;</p>
            <p>{user.email}</p>
          </div>
          <div className="flex justify-center">
            <p className="font-bold">Date sign in:&nbsp;</p>
            <p>{new Date(user.date).toLocaleString('ru-Ru')}</p>
          </div>
        </main>
        <button className="mt-10 mx-auto py-2 px-4 prose prose-xl font-bold h-auto rounded-md bg-slate-300">
          <Link to="/home/notes" className="no-underline">
            Go to Notes
          </Link>
        </button>
      </div>
    </>
  );
}

export default About;
