"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user?.email || session.user.email !== process.env.ADMIN_GITHUB_EMAIL) {
    throw new Error("Unauthorized")
  }
}

export async function createProject(data: any) {
  await requireAdmin()
  
  const project = await prisma.project.create({
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      tags: data.tags,
      priority: data.priority,
      featured: data.featured,
      published: data.published,
    }
  })
  
  revalidatePath("/")
  revalidatePath("/admin")
  revalidatePath("/projects")
  return project
}

export async function updateProject(id: string, data: any) {
  await requireAdmin()
  
  const project = await prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      tags: data.tags,
      priority: data.priority,
      featured: data.featured,
      published: data.published,
    }
  })
  
  revalidatePath("/")
  revalidatePath("/admin")
  revalidatePath("/projects")
  revalidatePath(`/projects/${project.slug}`)
  return project
}

export async function deleteProject(id: string) {
  await requireAdmin()
  
  await prisma.project.delete({
    where: { id }
  })
  
  revalidatePath("/")
  revalidatePath("/admin")
  revalidatePath("/projects")
}
