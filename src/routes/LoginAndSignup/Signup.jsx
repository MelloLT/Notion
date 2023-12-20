import { useState } from 'react';
import { User } from '../../utils/Validation';
import { Api } from '../../utils/DataLoader';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setSecConfirm] = useState('');
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const checkErrors = {};
      const user = User.parse({
        email,
        password,
        date: Date.now(),
      });

      const query = new URLSearchParams({ email }).toString();
      const existingUser = await Api.getUserByInfo({ query });

      if (existingUser) {
        checkErrors.isEmailUsed = 'The email is already used';
      }
      if (password !== confirm) {
        checkErrors.passwordMismatch = "Passwords don't match";
      }

      if (Object.keys(checkErrors).length > 0) {
        checkErrors.name = 'ValidationError'; // Добавляем свойство name
        throw checkErrors;
      }

      console.log('new user: ', user);
      navigate('/');
      Api.setUser({ user });
    } catch (err) {
      console.log(err instanceof Error);
      setErrors(null);
      if (err instanceof z.ZodError) {
        setErrors((curErrors) => {
          return { ...curErrors, ...err.format() };
        });
        console.log(err.format());
      } else {
        console.log('worked');
        setErrors((curErrors) => {
          return { ...curErrors, ...err };
        });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  return (
    <div className="prose flex flex-col gap-5 mx-auto">
      <h1>Sign up</h1>
      <input
        className="p-2 border border-stone-500 rounded-sm"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {errors && errors.email && (
        <div className="text-red-500">{errors.email._errors}</div>
      )}
      {errors && errors.isEmailUsed && (
        <div className="text-red-500">{errors.isEmailUsed}</div>
      )}
      <input
        className="p-2 border border-stone-500 rounded-sm"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        className="p-2 border border-stone-500 rounded-sm"
        type="password"
        placeholder="Reapeat password"
        value={confirm}
        onChange={(e) => setSecConfirm(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className="prose prose-xl font-bold h-auto w-28 m-auto rounded-md bg-slate-300"
        onClick={handleSignUp}
      >
        Sign up
      </button>

      <div className="h-15">
        {errors?.passwordMismatch && (
          <div className="text-red-500">{errors.passwordMismatch}</div>
        )}
        {errors?.password &&
          errors.password._errors.map((err) => {
            return (
              <div className="text-red-500" key={crypto.randomUUID()}>
                {err}
              </div>
            );
          })}
      </div>
      <Link to={'/'}>Already have account?</Link>
    </div>
  );
}

export default Signup;
