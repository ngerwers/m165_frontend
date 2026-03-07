// src/components/carCard.tsx
import Link from "next/link";

interface CarProps {
  car: {
    id: string;
    manufacturer: string;
    model: string;
    year: number;
    cat: string;
    price: number;
  };
}

// WICHTIG: Die Funktion hier muss großgeschrieben werden!
export default function CarCard({ car }: CarProps) {
  return (
    <Link href={`/cars/${car.id}`} className="group">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-secondary transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 border border-gray-500/10">
        
        <div className="relative flex h-48 w-full items-center justify-center bg-gray-800">
          <span className="text-gray-500">Bild Platzhalter</span>
          <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
            {car.cat}
          </span>
        </div>

        <div className="flex flex-grow flex-col p-6">
          <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
            {car.manufacturer}
          </div>
          <h2 className="mb-4 text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
            {car.model}
          </h2>
          
          <div className="mt-auto flex items-center justify-between border-t border-gray-500/20 pt-4">
            <span className="text-lg font-bold text-foreground">
              {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(car.price)}
            </span>
            <span className="text-sm text-gray-400">{car.year}</span>
          </div>
        </div>

      </div>
    </Link>
  );
}