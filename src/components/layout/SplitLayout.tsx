import * as React from "react";

interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function SplitLayout({ left, right }: SplitLayoutProps) {
  return (
    <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 lg:gap-16 pt-8 pb-24">
      <aside className="w-full lg:w-[35%] shrink-0">
        <div className="lg:sticky lg:top-24 flex flex-col gap-8 h-max">
          {left}
        </div>
      </aside>
      <main className="w-full lg:w-[65%] flex flex-col gap-16 lg:gap-24">
        {right}
      </main>
    </div>
  );
}
