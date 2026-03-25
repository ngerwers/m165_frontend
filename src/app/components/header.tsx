import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-4 z-50 mx-auto w-[96%] max-w-7xl rounded-full border border-gray-500/20 bg-secondary/90 px-6 py-4 shadow-lg backdrop-blur-md">      
      <nav className="flex items-center justify-between">
        
        {/* 1. Logo Bereich (Links) */}
        <div className="text-2xl font-bold text-primary">
          <Link href="/">Cars</Link>
        </div>

        {/* 3. Action Buttons / Erstellen (Rechts) */}
        <div className="flex items-center gap-3">
          <Link 
            href="/cars/new" 
            className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-md"
          >
            + Auto
          </Link>
          <Link 
            href="/manufacturers/new" 
            className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-md"
          >
            + Marke
          </Link>
          <Link 
            href="/engines/new" 
            className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-md"
          >
            + Motor
          </Link>
        </div>

      </nav>
    </header>
  );
}