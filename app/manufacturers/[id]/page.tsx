import Link from "next/link";
import { notFound } from "next/navigation";

import { getManufacturerById, getCarsByManufacturer } from "@/src/lib/api";
import CarCard from "@/src/app/components/carCard";
import DeleteButton from "@/src/app/components/deleteButton";

export default async function ManufacturerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const manufacturer = await getManufacturerById(id);
  if (!manufacturer) notFound();

  const brandCars = await getCarsByManufacturer(id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/" className="mb-8 inline-block text-accent transition-colors hover:text-primary">
        &larr; Zurück zur Startseite
      </Link>

      <div className="mb-12 rounded-3xl border border-gray-500/20 bg-secondary p-8 shadow-xl">
        
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="mb-2 text-5xl font-extrabold text-foreground">{manufacturer.name}</h1>
            <p className="mb-8 text-xl text-gray-400">{manufacturer.country}</p>
          </div>

          <div className="mb-8 flex gap-4 md:mb-0">
            <Link 
              href={`/manufacturers/${manufacturer.id}/edit`} 
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white shadow-md transition-colors hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg"
            >
              Bearbeiten
            </Link>
            
            <DeleteButton id={manufacturer.id} type="manufacturer" />
          </div>
        </div>
        
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
              {manufacturer.employees ? new Intl.NumberFormat('de-DE').format(manufacturer.employees) : "N/A"}
            </span>
          </div>
        </div>
      </div>

      <h2 className="mb-6 text-3xl font-bold text-foreground">Fahrzeuge von {manufacturer.name}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brandCars.length > 0 ? (
          brandCars.map((car: any) => <CarCard key={car.id} car={car} />)
        ) : (
          <p className="text-gray-400">Keine Fahrzeuge von diesem Hersteller gefunden.</p>
        )}
      </div>
    </div>
  );
}