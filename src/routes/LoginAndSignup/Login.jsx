import React, { useContext, useState } from "react";
import { User } from "../../utils/Validation";
import { z } from "zod";
import { UserContext } from "../../components/UserContextProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Api } from "../../utils/DataLoader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      User.parse({
        email,
        password,
        confirm: password,
        date: Date.now(),
      });

      const query = new URLSearchParams({
        email,
        password,
      }).toString();

      const user = await Api.getUserByInfo({ query });
      if (!user) {
        throw new Error(`Wrong password or email`);
      }

      userContext.onChange(user);
      navigate("/home");

      setErrors(null);
    } catch (err) {
      setErrors(null);
      if (err instanceof z.ZodError) {
        setErrors((curErrors) => {
          return { ...curErrors, ...err.format() };
        });
      } else {
        setErrors((curErrors) => {
          return { ...curErrors, isUserExist: err.message };
        });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="prose flex flex-col gap-5 mx-auto">
      <h1>Log in</h1>
      <input
        className="p-2 border border-stone-500 rounded-sm"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {errors?.email && (
        <div className="text-red-500">{errors.email._errors}</div>
      )}

      <input
        className="p-2 border border-stone-500 rounded-sm"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className="prose prose-xl font-bold h-auto w-28 m-auto rounded-md bg-slate-300"
        onClick={handleLogin}
      >
        Log in
      </button>
      {errors?.isUserExist && (
        <div className="text-red-500">{errors.isUserExist}</div>
      )}

      {errors?.user && <div className="text-red-500">{errors.user}</div>}
      <div className="h-15">
        {errors?.password &&
          errors.password._errors.map((err) => {
            return (
              <div className="text-red-500" key={crypto.randomUUID()}>
                {err}
              </div>
            );
          })}
      </div>
      <Link to={"/signUp"}>Don't have account?</Link>
    </div>
  );
}

export default React.memo(Login);
