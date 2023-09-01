import Link from "next/link";
import Messages from "./messages";

export default function Login() {
  return (
    <div className="mx-auto flex h-screen max-w-xl flex-1 flex-col items-center justify-center gap-2 px-8">
      <Link
        href="/"
        className="text-foreground bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm no-underline"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </Link>

      <form className="text-foreground flex w-full flex-col justify-center space-y-6" action="/auth/sign-up" method="post">
        {/* Email Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-lg border border-gray-300 bg-inherit px-4 py-2 transition duration-150 ease-in-out focus:border-green-500 focus:ring-1 focus:ring-green-500"
            name="email"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-lg border border-gray-300 bg-inherit px-4 py-2 transition duration-150 ease-in-out focus:border-green-500 focus:ring-1 focus:ring-green-500"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="rounded-lg border border-gray-300 bg-inherit px-4 py-2 transition duration-150 ease-in-out focus:border-green-500 focus:ring-1 focus:ring-green-500"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Sign In Button */}
        <button type="submit" className="rounded-lg bg-green-700 px-5 py-2 text-white transition duration-150 ease-in-out hover:bg-green-800">
          Sign Up
        </button>

        {/* Sign Up Button */}
        <Link
          href="/login"
          className="mt-4 rounded-lg border border-gray-700 px-5 py-2 text-white transition duration-150 ease-in-out hover:border-gray-800"
        >
          Need to sign in?{" "}
        </Link>

        {/* Messages Component */}
        <Messages />
      </form>
    </div>
  );
}
