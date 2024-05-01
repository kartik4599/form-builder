"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const VisitBtn = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <Button className="w-[200px]" asChild>
      <Link target="_blank" href={shareLink}>
        Visit
      </Link>
    </Button>
  );
};

export default VisitBtn;
