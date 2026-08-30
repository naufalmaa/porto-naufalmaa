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

function ImageCarousel({ images, altPrefix = "Showcase" }: { images: string[]; altPrefix?: string }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="my-10">
      <Carousel className="w-full relative">
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx}>
              <div className="aspect-video rounded-xl border border-border/50 overflow-hidden bg-muted/20">
                <Dialog>
                  <DialogTrigger 
                    render={
                      <button type="button" className="block w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                    }
                  >
                    <img src={img} alt={`${altPrefix} ${idx + 1}`} className="w-full h-full object-contain cursor-pointer hover:opacity-90 transition-opacity" />
                  </DialogTrigger>
                  <DialogContent showCloseButton={true} className="max-w-[95vw] sm:max-w-[95vw] h-[95vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center">
                    <img src={img} alt={`${altPrefix} ${idx + 1}`} className="max-w-full max-h-full object-contain" />
                  </DialogContent>
                </Dialog>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-4 shadow-md bg-background/80 backdrop-blur" />
            <CarouselNext className="absolute right-4 shadow-md bg-background/80 backdrop-blur" />
          </>
        )}
      </Carousel>
      {images.length > 1 && (
        <p className="text-center text-xs text-muted-foreground mt-2.5 font-sans">
          Swipe or click arrows to view all {images.length} screens
        </p>
      )}
    </div>
  );
}

function parseWorkflow(text: string) {
  if (text.includes('User opens the map')) {
    return {
      leftTitle: "Action Trigger",
      rightTitle: "System Pipeline & Outcome",
      leftSteps: [
        { label: 'User opens the map' },
        { label: 'Clicks on an asset' }
      ],
      rightSteps: [
        { label: 'Sees blocks, wells, facilities, pipelines' },
        { label: 'All related data loads in one view' },
        { label: 'Production, drilling, geology, economics, documents' },
        { label: 'Ask GAIA a question about any document' },
        { label: 'Get an answer with source references — instantly' }
      ]
    };
  }

  if (text.includes('Contractor fills project data')) {
    return {
      leftTitle: "Action Trigger",
      rightTitle: "System Pipeline & Outcome",
      leftSteps: [
        { label: 'Contractor fills project data' },
        { label: 'No more email attachments' }
      ],
      rightSteps: [
        { label: 'Data lands in the system' },
        { label: 'Dashboard updates in real time' },
        { label: 'Stakeholder monitors progress, cost, timeline' },
        { label: 'System auto-generates weekly reports' },
        { label: 'AI assistant answers quick questions' },
        { label: 'Everyone saves hours — every week' }
      ]
    };
  }

  return null;
}

function WorkflowVisualizer({ data }: { data: NonNullable<ReturnType<typeof parseWorkflow>> }) {
  return (
    <div className="my-8 rounded-2xl border border-border/80 bg-muted/20 dark:bg-card/40 p-5 md:p-7 shadow-xs not-prose">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start">
        {/* Left Column: User Actions */}
        <div className="w-full md:col-span-5 flex flex-col gap-3">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5 flex items-center gap-1.5 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {data.leftTitle}
          </div>
          {data.leftSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-card border border-border/70 rounded-xl p-3.5 shadow-xs font-sans">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm text-foreground">{step.label}</span>
                  <span className="text-primary font-bold text-sm hidden md:inline">→</span>
                </div>
              </div>
              {idx < data.leftSteps.length - 1 && (
                <div className="flex justify-center -my-1">
                  <div className="flex flex-col items-center text-muted-foreground/60">
                    <div className="w-px h-3 bg-border/80" />
                    <span className="text-[10px] leading-none">↓</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Right Column: System Outcomes */}
        <div className="w-full md:col-span-7 flex flex-col gap-2.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5 flex items-center gap-1.5 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {data.rightTitle}
          </div>
          {data.rightSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-card border border-border/70 rounded-xl p-3.5 shadow-xs font-sans flex items-start gap-3">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="font-medium text-sm text-foreground">{step.label}</span>
              </div>
              {idx < data.rightSteps.length - 1 && (
                <div className="flex justify-start ml-6 -my-1">
                  <div className="flex flex-col items-center text-muted-foreground/60">
                    <div className="w-px h-3 bg-border/80" />
                    <span className="text-[10px] leading-none">↓</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

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

  const pattern = /(\[CAROUSEL_PLACEHOLDER\]|\[CAROUSEL:\s*[^\]]+\])/g;
  const contentSegments = project.content.split(pattern).filter(Boolean);

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

      {/* Main Content (Markdown & Carousels rendering) */}
      <section className="pb-16 font-serif">
        {contentSegments.map((segment, index) => {
          if (segment === '[CAROUSEL_PLACEHOLDER]') {
            if (!project.galleryImages || project.galleryImages.length === 0) return null;
            return <ImageCarousel key={index} images={project.galleryImages} altPrefix="Gallery showcase" />;
          }

          if (segment.startsWith('[CAROUSEL:') && segment.endsWith(']')) {
            const rawUrls = segment.slice(10, -1);
            const urls = rawUrls.split(',').map(u => u.trim()).filter(Boolean);
            return <ImageCarousel key={index} images={urls} altPrefix="Showcase" />;
          }

          return (
            <div key={index} className="prose prose-neutral dark:prose-invert max-w-none prose-lg md:prose-xl prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-p:leading-relaxed prose-p:text-foreground/90 prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-foreground/80 prose-img:rounded-2xl prose-img:shadow-md prose-img:border prose-img:mx-auto">
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
                  ),
                  pre: ({ node, children, ...props }) => {
                    const codeContent = React.Children.toArray(children)
                      .map((child: any) => (typeof child === 'string' ? child : child?.props?.children || ''))
                      .join('');

                    const workflowData = parseWorkflow(codeContent);
                    if (workflowData) {
                      return <WorkflowVisualizer data={workflowData} />;
                    }

                    return (
                      <pre className="bg-muted/40 dark:bg-card/60 border border-border/70 rounded-xl p-5 md:p-6 overflow-x-auto my-6 text-foreground font-mono text-xs sm:text-sm md:text-sm leading-relaxed shadow-xs [font-family:Consolas,ui-monospace,Menlo,Monaco,monospace]" {...props}>
                        {children}
                      </pre>
                    );
                  },
                  code: ({ node, className, children, ...props }) => {
                    const isInline = !className && typeof children === 'string' && !children.includes('\n');
                    if (isInline) {
                      return (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary font-medium" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return <code className="font-mono text-inherit" {...props}>{children}</code>;
                  }
                }}
              >
                {segment}
              </ReactMarkdown>
            </div>
          );
        })}
      </section>
    </div>
  )

  return <SplitLayout left={LeftPanel} right={RightPanel} />
}
