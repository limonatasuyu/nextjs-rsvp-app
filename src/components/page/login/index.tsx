"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { signInAction } from "@/actions/auth";
import { useSearchParams } from "next/navigation";

export function LoginPage() {
  const searchParams = useSearchParams();
  const [state, formAction] = useActionState(signInAction, { error: "", success: false });

  const action = (payload: FormData) => {
    const payload_ = payload;
    const redirectTo = searchParams.get("redirectTo");
    if (redirectTo && typeof redirectTo === "string") {
      payload_.set("redirectTo", redirectTo);
    } else {
      payload_.set("redirectTo", "/");
    }
    formAction(payload_);
  };

  useEffect(() => {
    const redirectTo = searchParams.get("redirectTo");
    if (state.success) {
      window.location.href = redirectTo ? redirectTo as string : "/";
    }
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>

        {/* Google Sign In */}
        <form action={action}>
          <input type="hidden" name="signInType" value="google" />
          <button
            type="submit"
            className="w-full bg-white border border-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-50 transition"
          >
            Sign in with Google
          </button>
        </form>

        <div className="flex items-center gap-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Credentials Sign In */}
        <form action={action} className="space-y-4">
          <input type="hidden" name="signInType" value="credentials" />
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          {state.error && <p className="text-red-500">{state.error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign in with Email
          </button>
          <Link
            href="/signup"
            className="w-full block text-center bg-green-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign up
          </Link>
        </form>
      </div>
    </div>
  );
}
