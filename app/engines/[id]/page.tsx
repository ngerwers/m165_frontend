import Link from "next/link";
import { notFound } from "next/navigation";
import { getEngineById, getAllCars } from "@/src/lib/api";
import CarCard from "@/src/app/components/carCard";
import DeleteButton from "@/src/app/components/deleteButton";

export default async function EngineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const engine = await getEngineById(id);
  if (!engine) notFound();

  const allCars = await getAllCars();
  const engineCars = allCars.filter((car: any) => car.engine_id === id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/" className="mb-8 inline-block text-accent transition-colors hover:text-primary">&larr; Zurück zur Startseite</Link>

      <div className="mb-12 rounded-3xl border border-gray-500/20 bg-secondary p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-widest text-accent">Motordatenbank</h3>
            <h1 className="mb-8 mt-2 text-5xl font-extrabold text-foreground">{engine.code}</h1>
          </div>
          <div className="mb-8 flex gap-4 md:mb-0">
            <Link href={`/engines/${engine.id}/edit`} className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white shadow-md transition-colors hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg">Bearbeiten</Link>
            <DeleteButton id={engine.id} type="engine" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
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

          {engine.cylinders && (
            <div className="flex flex-col border-l-2 border-accent pl-4">
              <span className="text-sm text-gray-400">Zylinder</span>
              <span className="font-semibold text-foreground">{engine.cylinders}</span>
            </div>
          )}
          {engine.displacement_ccm && (
            <div className="flex flex-col border-l-2 border-accent pl-4">
              <span className="text-sm text-gray-400">Hubraum</span>
              <span className="font-semibold text-foreground">{engine.displacement_ccm} ccm</span>
            </div>
          )}

          {engine.battery_kwh && (
            <div className="flex flex-col border-l-2 border-accent pl-4">
              <span className="text-sm text-gray-400">Batterie</span>
              <span className="font-semibold text-foreground">{engine.battery_kwh} kWh</span>
            </div>
          )}
          {engine.voltage && (
            <div className="flex flex-col border-l-2 border-accent pl-4">
              <span className="text-sm text-gray-400">Systemspannung</span>
              <span className="font-semibold text-foreground">{engine.voltage} V</span>
            </div>
          )}
          {engine.charging_kw && (
            <div className="flex flex-col border-l-2 border-accent pl-4">
              <span className="text-sm text-gray-400">Ladeleistung</span>
              <span className="font-semibold text-foreground">{engine.charging_kw} kW</span>
            </div>
          )}
        </div>
      </div>

      <h2 className="mb-6 text-3xl font-bold text-foreground">Fahrzeuge mit dem {engine.code} Motor</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {engineCars.length > 0 ? (
          engineCars.map((car: any) => <CarCard key={car.id} car={car} />)
        ) : (
          <p className="text-gray-400">Keine Fahrzeuge mit diesem Motor gefunden.</p>
        )}
      </div>
    </div>
  );
}