import { signIn } from "@/auth"
import { LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20">
      <div className="max-w-md w-full p-8 bg-card border rounded-2xl shadow-sm text-center">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Admin Login</h1>
        <p className="text-muted-foreground mb-8">Sign in with the authorized GitHub account to access the CMS.</p>
        
        <form
          action={async () => {
            "use server"
            await signIn("github", { redirectTo: "/admin/projects" })
          }}
        >
          <Button type="submit" className="w-full h-12 text-base gap-2">
            <LogIn className="w-5 h-5" />
            Continue with GitHub
          </Button>
        </form>
      </div>
    </div>
  )
}
