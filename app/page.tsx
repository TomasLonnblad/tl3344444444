"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-foreground/70 font-sans">Loading 3D Scene...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Scene />

      {/* Overlay UI */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <div className="px-6 py-3 bg-card/80 backdrop-blur-md rounded-lg border border-border">
          <p className="text-foreground/90 text-sm font-sans">
            Drag to rotate | Scroll to zoom
          </p>
        </div>
      </div>

      {/* Corner branding */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <h1 className="text-2xl font-bold text-foreground tracking-tight font-sans">
          3D Studio
        </h1>
        <p className="text-muted-foreground text-sm font-sans">Interactive Experience</p>
      </div>
    </main>
  );
}
