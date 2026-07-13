"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { createProject, updateProject, deleteProject } from "@/lib/actions/projects"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import "@uiw/react-md-editor/markdown-editor.css";
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export function ProjectForm({ project }: { project?: any }) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [content, setContent] = React.useState(project?.content || "")

  async function handleSubmit(formData: FormData) {
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content,
      coverImage: formData.get("coverImage") as string,
      tags: (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean),
      priority: parseInt(formData.get("priority") as string) || 0,
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
    }

    startTransition(async () => {
      if (project?.id) {
        await updateProject(project.id, data)
      } else {
        await createProject(data)
      }
      router.push("/admin/projects")
    })
  }

  async function handleDelete() {
    if (!project?.id) return
    if (!confirm("Are you sure you want to delete this project?")) return
    
    startTransition(async () => {
      await deleteProject(project.id)
      router.push("/admin/projects")
    })
  }

  return (
    <form action={handleSubmit} className="space-y-8 bg-card border rounded-xl p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required defaultValue={project?.title} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required defaultValue={project?.slug} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" name="excerpt" required defaultValue={project?.excerpt} />
      </div>

      <div className="space-y-2" data-color-mode="light">
        <Label>Content (Markdown)</Label>
        <div className="border rounded-md overflow-hidden">
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || "")}
            height={400}
            preview="edit"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input id="coverImage" name="coverImage" defaultValue={project?.coverImage || ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input id="tags" name="tags" placeholder="geoscience, data-ai" defaultValue={project?.tags?.join(", ")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Priority (Higher number = higher order)</Label>
          <Input id="priority" name="priority" type="number" defaultValue={project?.priority || 0} />
        </div>
      </div>

      <div className="flex gap-8 border-t pt-6">
        <div className="flex items-center space-x-2">
          <Switch id="featured" name="featured" defaultChecked={project?.featured} />
          <Label htmlFor="featured">Featured Project</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="published" name="published" defaultChecked={project?.published} />
          <Label htmlFor="published">Published</Label>
        </div>
      </div>

      <div className="flex justify-between items-center border-t pt-6">
        {project?.id ? (
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isPending}>Delete</Button>
        ) : <div />}
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>Cancel</Button>
          <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save Project"}</Button>
        </div>
      </div>
    </form>
  )
}
