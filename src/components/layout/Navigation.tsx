"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Geoscience", href: "/geoscience" },
  { name: "Data & AI", href: "/data-ai" },
  { name: "Beyond Work", href: "/beyond-work" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity">
          Naufal
        </Link>
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center space-x-2">
          <Link href="/admin/login" className="p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full transition-colors" title="Admin Login">
            <LogIn className="w-4 h-4" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
