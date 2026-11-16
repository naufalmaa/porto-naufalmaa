import { redirect } from "next/navigation";

// Old per-tab project URLs now live under /projects.
export default async function LegacyProjectPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  redirect(`/projects/${slug}`);
}
