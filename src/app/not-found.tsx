import Link from "next/link";
import { Home, Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
        <Search className="w-8 h-8" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
        Page Not Found
      </h1>

      <p className="text-muted-foreground max-w-md text-base md:text-lg mb-8 leading-relaxed">
        We couldn&apos;t find the page you were looking for. It may have been moved, renamed, or doesn&apos;t exist.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <Link
          href="/projects"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Explore Projects
        </Link>
      </div>
    </div>
  );
}
