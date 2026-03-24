// src/app/manufacturers/[id]/page.tsx
import Link from "next/link";
import { mockManufacturers } from "@/src/lib/mockCars";
import { mockCars } from "@/src/lib/mockCars";

import { notFound } from "next/navigation";
import CarCard from "@/src/app/components/carCard";

export default async function ManufacturerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const manufacturer = mockManufacturers.find((m) => m.id === id);
  if (!manufacturer) notFound();

  // Alle Autos suchen, die von dieser Marke sind
  const brandCars = mockCars.filter((car) => car.manufacturer_id === id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/" className="mb-8 inline-block text-accent transition-colors hover:text-primary">
        &larr; Zurück zur Startseite
      </Link>

      {/* Info-Box der Marke */}
      <div className="mb-12 rounded-3xl border border-gray-500/20 bg-secondary p-8 shadow-xl">
        <h1 className="mb-2 text-5xl font-extrabold text-foreground">{manufacturer.name}</h1>
        <p className="mb-8 text-xl text-gray-400">{manufacturer.country}</p>
        
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="flex flex-col border-l-2 border-accent pl-4">
            <span className="text-sm text-gray-400">Hauptsitz</span>
            <span className="font-semibold text-foreground">{manufacturer.hq}</span>
          </div>
          <div className="flex flex-col border-l-2 border-accent pl-4">
            <span className="text-sm text-gray-400">Gegründet</span>
            <span className="font-semibold text-foreground">{manufacturer.founded}</span>
          </div>
          <div className="flex flex-col border-l-2 border-accent pl-4">
            <span className="text-sm text-gray-400">CEO</span>
            <span className="font-semibold text-foreground">{manufacturer.ceo}</span>
          </div>
          <div className="flex flex-col border-l-2 border-accent pl-4">
            <span className="text-sm text-gray-400">Mitarbeiter</span>
            <span className="font-semibold text-foreground">
              {new Intl.NumberFormat('de-DE').format(manufacturer.employees)}
            </span>
          </div>
        </div>
      </div>

      {/* Liste der Autos dieser Marke */}
      <h2 className="mb-6 text-3xl font-bold text-foreground">Fahrzeuge von {manufacturer.name}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brandCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}