"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      className="text-xs text-neutral-700 dark:text-neutral-300 mt-2 mb-6"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

export function SignIn() {
  return (
    <Button className="mb-6" onClick={() => signIn("github")}>
      <img alt="GitHub logo" src="/github-logo.svg" width="20" height="20" />
      <div className="ml-3">Sign in with GitHub</div>
    </Button>
  );
}
