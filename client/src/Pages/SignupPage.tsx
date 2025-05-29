import { Link, useNavigate } from "react-router";
import { user } from "../type/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SIGN_UP_URL } from "../lib/config";
import { UseAuthQuery } from "../lib/auth";

const SignupPage = () => {
  const [formData, setFormData] = useState<user>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient(); 
  const {mutate, isPending} = useMutation ({
  mutationFn: ({ url, body }: { url: string; body: any }) => UseAuthQuery(url, body),
    onSuccess: (data) => {
      if(data.success) {
        toast.success("Account Created Successfully")
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: ""
        })
        queryClient.invalidateQueries({queryKey: ["authUser"]})
        navigate("/")
      } else {
        toast.error("Something went wrong")
      }
    },
    onError: (error: any) => {
      if(error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  });
  const onSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password do not match")
      return;
    }
    mutate({ url: SIGN_UP_URL, body: formData });
  }

  return (
    <>
      <div className="h-[100vh] flex items-center bg-black" data-theme="light">
        <div className="max-w-lg mx-auto  bg-white p-8 rounded-xl shadow shadow-slate-300  w-[100%]">
          <h1 className="text-3xl font-medium text-black">Sign Up</h1>
          <p className="text-black mt-2">Create an account 👋</p>
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
          <form className="my-1" onSubmit={onSubmission}>
            <div className="flex flex-col space-y-5">
            <label htmlFor="fullName">
                <p className="font-medium text-slate-700 pb-1">Full Name</p>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="w-full bg-white py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-black"
                  placeholder="Enter Full Name"
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  value={formData.fullName}
                />
              </label>
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-1">Email address</p>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full bg-white py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-black"
                  placeholder="Enter email address"
                  onChange={(e) => setFormData({...formData , email: e.target.value})}
                />
              </label>
              <label htmlFor="password">
                <p className="font-medium text-slate-700 pb-1">Password</p>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full bg-white py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-black"
                  placeholder="Enter your password"
                  onChange={(e) => setFormData({...formData , password: e.target.value})}
                />
              </label>
              <label htmlFor="confirmPassword">
                <p className="font-medium text-slate-700 pb-1">Confirm Password</p>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full bg-white py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-black"
                  placeholder="Enter your confirm password"
                  onChange={(e) => setFormData({...formData , confirmPassword: e.target.value})}
                />
              </label>
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
                <span> {isPending ? "sign Up..." : "Sign Up"}</span>
              </button>
              <p className="text-center">
                Already have an Account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span>Login </span>
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

export default SignupPage;
