"use client";

import { useRouter } from "next/navigation";
import { useSonner } from "sonner";
import { CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";

type Props = {
  type: "login" | "register";
};

function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";
  const router = useRouter;
  const sonner = useSonner();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    console.log("Form Submitted");
  };
  return (
    <form action={handleSubmit}>
      <CardContent>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            disabled={isPending}
          ></Input>
        </div>
      </CardContent>
    </form>
  );
}

export default AuthForm;
