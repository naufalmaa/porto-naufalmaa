import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/api/auth/signin")
  }
  
  if (session.user.email !== process.env.ADMIN_GITHUB_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md p-8 border rounded-xl bg-card shadow-sm text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You are authenticated as {session.user.email}, but this account is not authorized to access the CMS.</p>
          <Link href="/api/auth/signout">
            <Button variant="outline">Sign Out</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-bold text-lg tracking-tight">Admin CMS</Link>
            <nav className="flex gap-4">
              <Link href="/admin/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors" target="_blank">View Site ↗</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{session.user.email}</span>
            <Link href="/api/auth/signout" className="text-sm text-muted-foreground hover:underline">Sign Out</Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
