import { ProjectForm } from "@/components/admin/ProjectForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className={buttonVariants({ variant: "ghost", size: "icon" })}>
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Project</h1>
        </div>
      </div>
      
      <ProjectForm />
    </div>
  )
}
