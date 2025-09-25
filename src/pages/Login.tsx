import { useState } from "react";
import { useAuth } from "../hooks/useAuth.ts";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/home");
    } catch {
      console.log("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-400 to-blue-400 p-4 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">👤</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Welcome Back</h2>
            <p className="text-sm text-blue-100">
              Sign in to your ScoreWise account
            </p>
          </div>

          <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 bg-blue-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 bg-blue-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                🔑 Sign In
              </button>
            </form>

            <div className="mt-4 text-center">
              <div className="relative mb-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500 font-medium">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-full px-4 py-2 bg-white border border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-700 font-semibold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2"
              >
                ➕ Create New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
