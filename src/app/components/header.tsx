import Link from "next/link";

export default function Header() {
  return (
   
    <header className="sticky top-4 z-50 mx-auto w-[96%] max-w-7xl rounded-full bg-secondary/90 px-6 py-4 shadow-lg backdrop-blur-md border border-gray-500/20">      <nav className="flex items-center justify-between">
        
        {/* Logo Bereich */}
        <div className="text-2xl font-bold text-primary">
          <Link href="/">MeinLogo</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6 font-medium text-foreground">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-primary transition-colors">
              Über uns
            </Link>
          </li>
          <li>
            <Link href="/portfolio" className="hover:text-primary transition-colors">
              Portfolio
            </Link>
          </li>
          
          <li>
            <Link 
              href="/contact" 
              className="rounded-full bg-primary px-5 py-2 text-white transition-colors hover:bg-accent"
            >
              Kontakt
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
}