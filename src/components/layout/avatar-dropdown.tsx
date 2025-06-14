"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import { Session } from "next-auth";
import { signOutAction } from "@/actions/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";

function X() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 text-gray-500 hover:text-gray-700"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function Avatar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle-user-icon lucide-circle-user w-6 h-6"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}


export function LogoutButton() {
  const [state, formAction, isPending] = useActionState(signOutAction, null);
  console.log("state: ", state);
  return (
    <form action={formAction}>
      <button
        disabled={isPending}
        type="submit"
        className={cn(
          "w-full py-2 px-4 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition",
          isPending && "opacity-50 cursor-not-allowed"
        )}
      >
        {isPending ? "Signing Out..." : "Sign Out"}
      </button>
    </form>
  );
}

export function AvatarDropdown({ session }: { session: Session }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const name = session.user?.name ?? "Unknown";
  const email = session.user?.email ?? "No email";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition"
      >
        <Avatar />
        <span className="hidden sm:inline text-md font-medium">Profile</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-xl p-4 z-50 border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Your Account</h2>
            <button onClick={() => setIsOpen(false)} aria-label="Close">
              <X />
            </button>
          </div>

          <div className="text-sm text-gray-700 space-y-1 mb-4">
            <Link href="/events" className="block font-medium text-primary hover:underline">
              Go to Dashboard
            </Link>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
          </div>

          <LogoutButton />
        </div>
      )}
    </div>
  );
}
