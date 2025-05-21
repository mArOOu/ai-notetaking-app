"use client";

import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const Router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const handleLogout = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const errorMessage = null;

    if (!errorMessage) {
      toast("You have been logged out successfully.");
      Router.push("/");
    } else {
      toast.error(errorMessage);
    }

    setLoading(false);
  };

  return (
    <Button
      className="width-24"
      variant={"outline"}
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogoutButton;
