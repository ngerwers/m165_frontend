// src/app/page.tsx
import { mockCars } from "../src/lib/mockCars";

// Hier achten wir auf den kleingeschriebenen Dateinamen am Ende:
import CarCard from "../src/app/components/carCard";

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold text-foreground">Verfügbare Fahrzeuge</h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockCars.map((car) => (
          // Aufruf zwingend mit Großbuchstabe!
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}