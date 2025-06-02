"use server";

import { signIn, signOut } from "@/../auth";
import { createUser, getCredentialsAccountByEmail } from "@/lib/db/user-logic";
import { hash } from "bcryptjs";

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function signInAction(prevState: { error: string; success: boolean }, formData: FormData) {
  const signInType = formData.get("signInType") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/";

  if (signInType === "google") {
    await signIn("google", {
      redirectTo: redirectTo,
    });
    return { success: true, error: "" };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) {
    return { error: "Missing required fields", success: false };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true, error: "" };
  } catch (error: any) {
    if (error.name === "CredentialsSignin") {
      return { error: "Invalid email or password", success: false };
    }
    if (error.name === "Error" && error.message === "NEXT_REDIRECT") {
      return { error: "", success: true };
    }
    return { error: "Something went wrong. Please try again.", success: false };
  }
}

export async function signUpAction(prevState: { error: string; success: boolean }, user: FormData) {
  const name = user.get("name") as string;
  const email = user.get("email") as string;
  const password = user.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Missing required fields", success: false };
  }

  const existingUser = await getCredentialsAccountByEmail(email);
  if (existingUser) {
    return { error: "User already exists", success: false };
  }

  const hashedPassword = await hash(password, 10);
  const createdUser = await createUser({
    email,
    hashedPassword,
    name,
  });
  if (!createdUser) {
    return { error: "Failed to create user", success: false };
  }
  return { success: true, error: "" };
}
