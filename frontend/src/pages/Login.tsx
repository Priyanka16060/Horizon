import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Rocket } from "lucide-react";

import background from "../assets/login-bg.png";

import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login: saveToken } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await login({
        email,
        password,
      });

      saveToken(res.access_token);

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

      {/* Login Card */}

      <div className="relative w-full max-w-md mx-6">

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-black/55 backdrop-blur-md border border-white/20 p-10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
        >
                  {/* Logo */}

        <div className="flex justify-center mb-6">

          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm flex items-center justify-center">

            <Rocket size={34} className="text-slate-200" />

          </div>

        </div>

        {/* Title */}

        <h1 className="text-5xl font-bold tracking-wide text-center bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">

          Horizon

        </h1>

        <p className="text-slate-400 text-center mt-3 mb-10">

          Manage your projects with confidence.

        </p>

          {/* Email */}

          <div className="mb-6">

            <label className="text-sm text-slate-300">

              Email

            </label>

            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-blue-500 transition"
            />

          </div>

          {/* Password */}

          <div>

            <label className="text-sm text-slate-300">

              Password

            </label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 pr-12 text-white placeholder:text-slate-400 outline-none focus:border-blue-500 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Error */}

          {error && (

            <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">

              {error}

            </div>

          )}

          {/* Button */}

          <button
  type="submit"
  disabled={loading}
  className="mt-8 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm py-4 font-semibold text-white transition-all duration-200 hover:bg-white/20 hover:border-white/30 active:scale-[0.98] disabled:opacity-60 disabled:hover:bg-white/10"
>
  {loading
    ? "Signing In..."
    : "Sign In"}
</button>

          {/* Divider */}

          <div className="my-8 flex items-center">

            <div className="flex-1 h-px bg-slate-700"></div>

            <span className="px-4 text-slate-400 text-sm">
              OR
            </span>

            <div className="flex-1 h-px bg-slate-700"></div>

          </div>

          {/* Register */}

          <p className="text-center text-slate-400">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 font-medium text-purple-400 hover:text-purple-300"
            >
              Register
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}