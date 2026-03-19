// src/app/cars/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
// Wir nutzen den relativen Pfad, damit es bei dir garantiert funktioniert!
import { getCarById } from "@/src/lib/api";

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. ID aus der URL holen
  const { id } = await params;
  
  // 2. Auto über unsere neue API-Datei aus der Datenbank laden
  const car = await getCarById(id);

  // 3. Wenn das Auto nicht existiert, zeige die 404-Seite
  if (!car) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      
      {/* Zurück-Button */}
      <Link href="/" className="mb-8 inline-block text-accent transition-colors hover:text-primary">
        &larr; Zurück zur Übersicht
      </Link>

      <div className="overflow-hidden rounded-3xl border border-gray-500/20 bg-secondary shadow-2xl">
        
        {/* Header-Bereich */}
        <div className="bg-gradient-to-br from-gray-900 to-secondary p-12 text-center md:text-left">
          <Link 
            href={`/manufacturers/${car.manufacturer_id}`} 
            className="text-xl font-bold uppercase tracking-widest text-accent hover:underline"
          >
            {car.manufacturer}
          </Link>
          <h1 className="mt-2 text-5xl font-extrabold text-foreground">{car.model}</h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <span className="rounded-full bg-primary px-4 py-2 text-lg font-bold text-white shadow-md">
              {car.cat}
            </span>
            <p className="text-3xl font-bold text-foreground">
              {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(car.price)}
            </p>
          </div>
        </div>

        {/* CRUD Buttons (Bearbeiten / Löschen) */}
        <div className="flex justify-end gap-4 border-b border-gray-500/20 bg-background/50 px-8 py-4">
          <Link 
            href={`/cars/${car.id}/edit`} 
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-500 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Bearbeiten
          </Link>
          <button 
            className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-colors hover:bg-red-500 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Löschen
          </button>
        </div>

        {/* Daten-Grid */}
        <div className="grid gap-8 p-8 md:grid-cols-2">
          
          {/* Box 1: Basis-Spezifikationen */}
          <div className="rounded-xl bg-background p-6 shadow-inner border border-gray-500/10">
            <h2 className="mb-4 text-2xl font-bold text-primary">Fahrzeugdaten</h2>
            <ul className="space-y-3 text-foreground">
              <li className="flex justify-between border-b border-gray-500/10 pb-2">
                <span className="text-gray-400">Baujahr:</span> 
                <span className="font-semibold">{car.year}</span>
              </li>
              <li className="flex justify-between border-b border-gray-500/10 pb-2">
                <span className="text-gray-400">Antrieb:</span> 
                <span className="font-semibold">{car.specs?.drive || "N/A"}</span>
              </li>
              <li className="flex justify-between border-b border-gray-500/10 pb-2">
                <span className="text-gray-400">Top Speed:</span> 
                <span className="font-semibold">{car.specs?.top_speed_kmh ? `${car.specs.top_speed_kmh} km/h` : "N/A"}</span>
              </li>
              <li className="flex justify-between border-b border-gray-500/10 pb-2">
                <span className="text-gray-400">Gewicht:</span> 
                <span className="font-semibold">{car.specs?.weight_kg ? `${car.specs.weight_kg} kg` : "N/A"}</span>
              </li>
              <li className="flex justify-between pb-2">
                <span className="text-gray-400">Sitze:</span> 
                <span className="font-semibold">{car.specs?.seats || "N/A"}</span>
              </li>
            </ul>
          </div>

          {/* Box 2: Motor & Farben */}
          <div className="space-y-8">
            <div className="rounded-xl bg-background p-6 shadow-inner border border-gray-500/10">
              <h2 className="mb-4 text-2xl font-bold text-primary">
                <Link href={`/engines/${car.engine_id}`} className="hover:underline">
                  Motor ({car.engine?.code || "Unbekannt"}) &rarr;
                </Link>
              </h2>
              <ul className="space-y-3 text-foreground">
                <li className="flex justify-between border-b border-gray-500/10 pb-2">
                  <span className="text-gray-400">Typ:</span> 
                  <span className="font-semibold">{car.engine?.type || "N/A"}</span>
                </li>
                <li className="flex justify-between border-b border-gray-500/10 pb-2">
                  <span className="text-gray-400">Leistung:</span> 
                  <span className="font-semibold">{car.engine?.hp ? `${car.engine.hp} PS` : "N/A"}</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span className="text-gray-400">Drehmoment:</span> 
                  <span className="font-semibold">{car.engine?.nm ? `${car.engine.nm} Nm` : "N/A"}</span>
                </li>
              </ul>
            </div>

            {/* Farben */}
            <div className="rounded-xl bg-background p-6 shadow-inner border border-gray-500/10">
              <h2 className="mb-3 text-xl font-bold text-primary">Verfügbare Farben</h2>
              <div className="flex flex-wrap gap-2">
                {car.colors && car.colors.length > 0 ? (
                  car.colors.map((color: string) => (
                    <span key={color} className="rounded-full border border-gray-500/20 bg-secondary px-3 py-1 text-sm text-foreground shadow-sm">
                      {color}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">Keine Farben hinterlegt</span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}