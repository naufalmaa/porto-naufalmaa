export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-8 mt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Naufal. All rights reserved.</p>
        <p className="mt-4 md:mt-0">
          Bridging Geoscience, Data & AI, and Digital Products
        </p>
      </div>
    </footer>
  );
}
