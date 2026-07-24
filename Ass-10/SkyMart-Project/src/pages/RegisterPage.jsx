import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";


const RegisterPage = () => {
        let navigate = useNavigate();
        let {register, handleSubmit , reset , formState: {errors}} = useForm();
        let {registeredUsers, setRegisteredUsers} = useContext(Auth);

let formSubmit = (data) => {
    let arr = [...registeredUsers, data];
    setRegisteredUsers(arr);
    alert("Registration successful! You can now log in.");
    localStorage.setItem("registeredUsers", JSON.stringify(arr));
    reset();
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Create Account 🚀
          </h1>
          <p className="mt-2 text-zinc-400">
            Register to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

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
              placeholder="Create a password"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Register Button */}
          <button
          onClick={() => navigate("/")}
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Register
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <button
          onClick={() => navigate("/")}
            className="font-semibold text-blue-500 transition hover:text-blue-400 cursor-pointer"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;