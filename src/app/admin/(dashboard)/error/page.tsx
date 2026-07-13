import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20">
      <div className="max-w-md w-full p-8 bg-card border rounded-2xl shadow-sm text-center">
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-destructive">Authentication Error</h1>
        <p className="text-muted-foreground mb-8">There was a problem signing you in. Either you are not authorized or the configuration is missing.</p>
        
        <Link href="/admin/login" className={buttonVariants({ variant: "outline", className: "w-full h-12" })}>
          Try Again
        </Link>
      </div>
    </div>
  )
}
