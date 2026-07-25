import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginFormSubmit, navigate, register, reset, handleSubmit, errors } = useAuth();

  return (
    <div className="min-h-screen bg-[#f5f3f0] dark:bg-[#0f0f10] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl px-8 py-10 shadow-sm border border-[#e8e5e0] dark:border-[#2c2c2e]">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-medium text-[#1a1a1a] tracking-tight">
              Sign in
            </h1>
            <p className="text-[#8a8580] text-sm mt-1.5">
              Enter your credentials to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(loginFormSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-[#4a4642] mb-1.5 font-medium">
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8a39e]"
                />

                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#faf8f6] border border-[#e0dcd7] rounded-lg py-2.5 pl-10 pr-3.5 text-[#1a1a1a] placeholder:text-[#b5b0aa] focus:outline-none focus:ring-2 focus:ring-[#6b8f71] focus:border-transparent transition text-sm"
                />
                {errors.email && (
                  <p className="text-[#c45a5a] text-xs mt-1.5">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-[#4a4642] mb-1.5 font-medium">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8a39e]"
                />

                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must not exceed 20 characters"
                    }
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-[#faf8f6] border border-[#e0dcd7] rounded-lg py-2.5 pl-10 pr-10 text-[#1a1a1a] placeholder:text-[#b5b0aa] focus:outline-none focus:ring-2 focus:ring-[#6b8f71] focus:border-transparent transition text-sm"
                />
                {errors.password && (
                  <p className="text-[#c45a5a] text-xs mt-1.5">{errors.password.message}</p>
                )}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a8a39e] hover:text-[#6b8f71] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 text-xs text-[#8a8580] cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded border-[#d0ccc6] bg-white text-[#6b8f71] focus:ring-2 focus:ring-[#6b8f71]/30 focus:ring-offset-0 cursor-pointer"
                />
                Remember me
              </label>

              <Link
                to="/"
                className="text-xs text-[#6b8f71] hover:text-[#5a7d60] font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-[#6b8f71] hover:bg-[#5a7d60] text-white py-2.5 rounded-lg font-medium transition-colors text-sm mt-1"
            >
              Sign in →
            </button>
          </form>

          {/* Register */}
          <div className="mt-7 text-center">
            <p className="text-sm text-[#8a8580]">
              Don't have an account?{" "}
              <button 
                onClick={() => navigate("/register")} 
                className="text-[#6b8f71] hover:text-[#5a7d60] font-medium transition-colors"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;