import { ProjectForm } from "@/components/admin/ProjectForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = await prisma.project.findUnique({
    where: { id: params.id }
  })

  if (!project) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className={buttonVariants({ variant: "ghost", size: "icon" })}>
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
          <p className="text-muted-foreground">{project.title}</p>
        </div>
      </div>
      
      <ProjectForm project={project} />
    </div>
  )
}
