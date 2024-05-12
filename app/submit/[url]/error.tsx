"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";

const error = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 my-auto">
      <h2 className="text-destructive text-4xl">Something went wrong!</h2>
      <Button asChild>
        <Link href={"/dashboard"}>Go back home</Link>
      </Button>
    </div>
  );
};

export default error;
