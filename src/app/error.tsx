"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 text-destructive mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
        Something went wrong
      </h1>

      <p className="text-muted-foreground max-w-md text-base mb-8 leading-relaxed">
        An unexpected error occurred while loading this page. Please try again or return to the homepage.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => reset()} size="lg">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Link
          href="/"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
