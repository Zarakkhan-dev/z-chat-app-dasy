import { useState } from "react";
import { Link } from "react-router";
import { login } from "../type/user";
import { LOGIN_URL } from "../lib/config";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [formState, setFormState] = useState<login>({
    email: "",
    password: "",
  });

  const {Login, isPending} = useLogin();

  const onSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    Login({ url: LOGIN_URL, body: formState });
  };
  return (
    <>
      <div className="h-[100vh] flex items-center bg-black" data-theme="light">
        <div className="max-w-lg mx-auto  bg-white p-8 rounded-xl shadow shadow-slate-300  w-[100%]">
          <h1 className="text-4xl font-medium text-black">Login</h1>
          <p className="text-black">Hi, Welcome back 👋</p>
          <div className="my-5">
            <button className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-6 h-6"
                alt="image"
              />{" "}
              <span>Login with Google</span>
            </button>
          </div>
          <form className="my-10" onSubmit={onSubmission}>
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-2">Email address</p>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full bg-white py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  value={formState.email}
                />
              </label>
              <label htmlFor="password">
                <p className="font-medium text-slate-700 pb-2">Password</p>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full bg-white py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setFormState({ ...formState, password: e.target.value })
                  }
                  value={formState.password}
                />
              </label>
              <div className="flex flex-row justify-between place-items-center">
                <div>
                  <label
                    htmlFor="remember"
                    className="text-black flex gap-2 items-center"
                  >
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 bg-white border border-slate-300 rounded 
                      checked:bg-blue-400 checked:border-blue-400 
                      focus:ring-0 focus:outline-none text-white"
                    />
                    <span>Remember me</span>
                  </label>
                </div>
                <div>
                  <a href="#" className="font-medium text-indigo-600">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span>{isPending ? "Login" : "Login ..."}</span>
              </button>
              <p className="text-center">
                Not registered yet?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span>Register now </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
