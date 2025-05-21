"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { loginAction, signUpAction } from "@/actions/user";

// Helper to show loading state on button
function SubmitButton({ isPending, isLoginForm }: { isPending: boolean; isLoginForm: boolean }) {
  return (
    <Button className="w-full" type="submit" disabled={isPending}>
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : isLoginForm ? (
        "Login"
      ) : (
        "Sign Up"
      )}
    </Button>
  );
}

type Props = {
  type: "login" | "signUp";
};

function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";
  const router = useRouter();

  // Wrapper action for useFormState
  const formAction = async (_prevState: { errorMessage: string | null }, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (isLoginForm) {
      return await loginAction(email, password);
    } else {
      return await signUpAction(email, password);
    }
  };

  const [state, dispatch] = useFormState(formAction, { errorMessage: null });
  const { pending } = useFormStatus();

  // Show toast on success or error
  React.useEffect(() => {
    if (state?.errorMessage) {
      toast.error(state.errorMessage);
    } else if (state && !state.errorMessage) {
      toast.success(isLoginForm ? "Logged in" : "Signed Up", {
        description: isLoginForm
          ? "You have successfully logged in"
          : "Check your email for a confirmation link",
      });
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={dispatch}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            disabled={pending}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
            disabled={pending}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-4">
        <SubmitButton isPending={pending} isLoginForm={isLoginForm} />
        <p className="text-xs">
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`text-blue-500 underline ${pending ? "pointer-events-none opacity-50" : ""}`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
