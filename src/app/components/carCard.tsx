import Link from "next/link";

interface CarProps {
  car: {
    id: string;
    manufacturer: string;
    manufacturer_id: string;
    model: string;
    year: number;
    cat: string;
    price: number;
    engine_id: string;
    engine: { code: string; type: string; hp: number };
  };
}

export default function CarCard({ car }: CarProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-500/10 bg-secondary p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20">
      
      <div className="mb-4 flex items-center justify-between">
        <Link 
          href={`/manufacturers/${car.manufacturer_id}`} 
          className="text-sm font-semibold uppercase tracking-wider text-accent transition-colors hover:text-primary hover:underline"
        >
          {car.manufacturer}
        </Link>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          {car.cat}
        </span>
      </div>

      <Link href={`/cars/${car.id}`}>
        <h2 className="mb-2 text-2xl font-bold text-foreground transition-colors hover:text-primary">
          {car.model}
        </h2>
      </Link>

      <Link 
        href={`/engines/${car.engine_id}`}
        className="mb-6 inline-block text-sm text-gray-400 transition-colors hover:text-accent hover:underline"
      >
        Motor: {car.engine.code} ({car.engine.hp} PS)
      </Link>
      
      <div className="mt-auto flex items-center justify-between border-t border-gray-500/20 pt-4">
        <span className="text-lg font-bold text-foreground">
          {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(car.price)}
        </span>
        <span className="text-sm text-gray-400">{car.year}</span>
      </div>

    </div>
  );
}