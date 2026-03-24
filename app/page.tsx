// src/app/page.tsx
import Link from "next/link";
import CarCard from "../src/app/components/carCard";
import { getAllCars } from "@/src/lib/api"; 

export default async function Page() {
  // Ein einziger, sauberer Aufruf!
  const liveCars = await getAllCars();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-foreground">Verfügbare Fahrzeuge</h1>
        <Link href="/cars/new" className="rounded-full bg-primary px-6 py-2 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg">
          + Neues Auto
        </Link>
      </div>
      
      {liveCars.length === 0 ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
          Keine Autos gefunden oder Backend offline.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {liveCars.map((car: any) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}