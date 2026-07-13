import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import prisma from "@/lib/prisma"
import { SplitLayout } from "@/components/layout/SplitLayout"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  
  let project = null;
  try {
    project = await prisma.project.findUnique({
      where: { slug: params.slug }
    });
  } catch (e) {
    console.error("Database connection failed. Please configure your .env file.");
  }

  if (!project || !project.published) {
    notFound()
  }

  const LeftPanel = (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <Link href="/projects" className={buttonVariants({ variant: "ghost", className: "pl-0 hover:bg-transparent hover:underline text-muted-foreground" })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map(tag => (
            <Badge key={tag} variant="outline" className="font-normal text-[10px] uppercase tracking-wider">{tag}</Badge>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {project.title}
        </h1>
      </div>
      
      <p className="text-lg text-muted-foreground leading-relaxed">
        {project.excerpt}
      </p>
    </div>
  )

  const RightPanel = (
    <div className="flex flex-col gap-12">
      {/* Hero Image */}
      {project.coverImage && (
        <section>
          <div className="w-full aspect-video md:aspect-[21/9] bg-muted/30 rounded-2xl border border-border/50 flex flex-col items-center justify-center overflow-hidden">
             <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          </div>
        </section>
      )}

      {/* Main Content (Markdown rendering) */}
      <section className="pb-16 font-serif">
        {project.content.split('[CAROUSEL_PLACEHOLDER]').map((part, index) => (
          <React.Fragment key={index}>
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-lg md:prose-xl prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-p:leading-relaxed prose-p:text-foreground/90 prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-foreground/80 prose-img:rounded-2xl prose-img:shadow-md prose-img:border prose-img:mx-auto">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ node, ...props }) => (
                    <Dialog>
                      <DialogTrigger 
                        render={
                          <button type="button" className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl overflow-hidden my-8" />
                        }
                      >
                        <img {...props} className="w-full h-full object-contain cursor-pointer hover:opacity-90 transition-opacity m-0" />
                      </DialogTrigger>
                      <DialogContent showCloseButton={true} className="max-w-[95vw] sm:max-w-[95vw] h-[95vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center">
                        <img {...props} className="max-w-full max-h-full object-contain" />
                      </DialogContent>
                    </Dialog>
                  )
                }}
              >
                {part}
              </ReactMarkdown>
            </div>
            
            {index === 0 && project.galleryImages && project.galleryImages.length > 0 && (
              <div className="my-12">
                <Carousel className="w-full relative">
                  <CarouselContent>
                    {project.galleryImages.map((img, idx) => (
                      <CarouselItem key={idx}>
                        <div className="aspect-video rounded-xl border border-border/50 overflow-hidden bg-muted/20">
                          <Dialog>
                            <DialogTrigger 
                              render={
                                <button type="button" className="block w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                              }
                            >
                              <img src={img} alt={`Gallery showcase ${idx + 1}`} className="w-full h-full object-contain cursor-pointer hover:opacity-90 transition-opacity" />
                            </DialogTrigger>
                            <DialogContent showCloseButton={true} className="max-w-[95vw] sm:max-w-[95vw] h-[95vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center">
                              <img src={img} alt={`Gallery showcase ${idx + 1}`} className="max-w-full max-h-full object-contain" />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {project.galleryImages.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-4 shadow-md bg-background/80 backdrop-blur" />
                      <CarouselNext className="absolute right-4 shadow-md bg-background/80 backdrop-blur" />
                    </>
                  )}
                </Carousel>
              </div>
            )}
          </React.Fragment>
        ))}
      </section>
    </div>
  )

  return <SplitLayout left={LeftPanel} right={RightPanel} />
}
