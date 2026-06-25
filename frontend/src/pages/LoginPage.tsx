import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  role: string;
}

const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await axiosClient.post<LoginResponse>("/api/auth/login", payload);
  return data;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("nexushr_token", data.accessToken);
      localStorage.setItem("nexushr_email", data.email);
      localStorage.setItem("nexushr_role", data.role);
      navigate("/dashboard");
    },
    onError: () => {
      setErrorMsg("Invalid credentials. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email || !password) {
      setErrorMsg("Email and password are required.");
      return;
    }
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857
                   M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857
                   m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">NexusHR</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3.5 py-2.5
                           text-white placeholder-slate-500 text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           transition duration-150"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3.5 py-2.5
                           text-white placeholder-slate-500 text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           transition duration-150"
              />
            </div>

            {/* Error */}
            {errorMsg && (
              <p className="text-red-400 text-sm bg-red-900/30 border border-red-800 rounded-lg px-3 py-2">
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800
                         text-white font-medium text-sm rounded-lg py-2.5
                         transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400
                         disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "Signing in…" : "Sign in"}
            </button>

          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Zidio Development · NexusHR v0.1
        </p>
      </div>
    </div>
  );
}