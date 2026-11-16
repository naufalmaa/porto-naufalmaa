export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-8 mt-16">
      <div className="container mx-auto px-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-muted-foreground">
        <p className="text-foreground/90">
          Open to Data Scientist (ML) roles, remote from Indonesia.{" "}
          <a href="mailto:naufalmadzkia@gmail.com" className="text-primary underline-offset-4 hover:underline">
            Email me
          </a>{" "}
          or ask for a live walkthrough of any demo.
        </p>
        <p>© {new Date().getFullYear()} Naufal Muhamad Adzkia</p>
      </div>
    </footer>
  );
}
