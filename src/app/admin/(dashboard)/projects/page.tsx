import prisma from "@/lib/prisma"
import Link from "next/link"
import { Plus, Pencil, Trash2, CheckCircle2, XCircle } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function AdminProjectsPage() {
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { priority: 'desc' }
    });
  } catch (e) {
    console.error("Database connection failed. Please configure your .env file.");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects across all domains.</p>
        </div>
        <Link href="/admin/projects/new" className={buttonVariants()}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Link>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Tags</th>
              <th className="px-6 py-4 font-medium text-center">Featured</th>
              <th className="px-6 py-4 font-medium text-center">Published</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No projects found. Create one to get started.
                </td>
              </tr>
            )}
            {projects.map(project => (
              <tr key={project.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{project.title}</div>
                  <div className="text-muted-foreground text-xs">{project.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 flex-wrap">
                    {project.tags.map((tag: string) => (
                      <Badge variant="outline" key={tag} className="text-[10px] font-normal">{tag}</Badge>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {project.featured ? <CheckCircle2 className="w-4 h-4 mx-auto text-primary" /> : <XCircle className="w-4 h-4 mx-auto text-muted-foreground/30" />}
                </td>
                <td className="px-6 py-4 text-center">
                  {project.published ? (
                    <Badge variant="default" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/projects/${project.id}/edit`} className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8" })}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
