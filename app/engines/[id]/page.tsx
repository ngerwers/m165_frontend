// src/app/engines/[id]/page.tsx
import Link from "next/link";
import { mockEngines } from "@/src/lib/mockCars";
import { mockCars } from "@/src/lib/mockCars";

import { notFound } from "next/navigation";
import CarCard from "@/src/app/components/carCard";

export default async function EngineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const engine = mockEngines.find((e) => e.id === id);
  if (!engine) notFound();

  // Alle Autos suchen, die diesen Motor verbaut haben
  const engineCars = mockCars.filter((car) => car.engine_id === id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/" className="mb-8 inline-block text-accent transition-colors hover:text-primary">
        &larr; Zurück zur Startseite
      </Link>

      {/* Info-Box des Motors */}
      <div className="mb-12 rounded-3xl border border-gray-500/20 bg-secondary p-8 shadow-xl">
        <h3 className="text-xl font-bold uppercase tracking-widest text-accent">Motordatenbank</h3>
        <h1 className="mb-8 mt-2 text-5xl font-extrabold text-foreground">{engine.code}</h1>
        
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="flex flex-col border-l-2 border-primary pl-4">
            <span className="text-sm text-gray-400">Typ</span>
            <span className="font-semibold text-foreground">{engine.type} ({engine.fuel || 'Strom'})</span>
          </div>
          <div className="flex flex-col border-l-2 border-primary pl-4">
            <span className="text-sm text-gray-400">Leistung</span>
            <span className="font-semibold text-foreground">{engine.hp} PS</span>
          </div>
          <div className="flex flex-col border-l-2 border-primary pl-4">
            <span className="text-sm text-gray-400">Drehmoment</span>
            <span className="font-semibold text-foreground">{engine.nm} Nm</span>
          </div>
          <div className="flex flex-col border-l-2 border-primary pl-4">
            <span className="text-sm text-gray-400">Gewicht</span>
            <span className="font-semibold text-foreground">{engine.weight_kg} kg</span>
          </div>
        </div>
      </div>

      {/* Liste der Autos mit diesem Motor */}
      <h2 className="mb-6 text-3xl font-bold text-foreground">Fahrzeuge mit dem {engine.code} Motor</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {engineCars.length > 0 ? (
          engineCars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <p className="text-gray-400">Keine Fahrzeuge mit diesem Motor gefunden.</p>
        )}
      </div>
    </div>
  );
}