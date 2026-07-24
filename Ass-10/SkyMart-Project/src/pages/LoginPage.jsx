import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Auth } from "../context/AuthContext";

const LoginPage = () => {

let {register, handleSubmit , reset , formState: {errors}} = useForm();
let {registeredUsers, setRegisteredUsers , loggedInUser, setLoggedInUser} =useContext(Auth);
let navigate = useNavigate();

let formSubmit = (data) => {
    console.log(data);
    let user = registeredUsers.find(user => user.email === data.email && user.password === data.password);
    if(!user){
        alert("Invalid email or password");
        reset();
        return;
    }else{
        setLoggedInUser(user);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
    }
    reset();
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back 👋
          </h1>
          <p className="mt-2 text-zinc-400">
            Sign in to continue to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Email
            </label>

            <input
              {...register("email", { 
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address"
                    }
                })}
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Password
            </label>

            <input
               {...register("password", { 
                required: "Password is required",
                minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long"
                },
                maxLength: {
                    value: 20,
                    message: "Password cannot exceed 20 characters"
                }
            })}
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <NavLink

            to="/register"
            className="font-semibold text-blue-500 transition hover:text-blue-400"
          >
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;