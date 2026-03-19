// src/app/cars/new/page.tsx
import Link from "next/link";
import { mockManufacturers, mockEngines } from "@/src/lib/mockCars";

export default function NewCarPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/" className="mb-8 inline-block text-accent transition-colors hover:text-primary">
        &larr; Abbrechen & Zurück
      </Link>

      <div className="rounded-3xl border border-gray-500/20 bg-secondary p-8 shadow-xl md:p-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Neues Auto anlegen</h1>

        <form className="space-y-8">
          
          {/* Basis-Daten */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Modell-Name</label>
              <input type="text" placeholder="z.B. 911 GT3" className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Kategorie</label>
              <input type="text" placeholder="z.B. Sport" className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Baujahr</label>
              <input type="number" placeholder="2024" className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Preis (€)</label>
              <input type="number" placeholder="150000" className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
          </div>

          <hr className="border-gray-500/20" />

          {/* Relationen: Marke & Motor auswählen */}
          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Hersteller Dropdown */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-400">Hersteller</label>
                <Link href="/manufacturers/new" className="text-xs text-primary hover:underline">
                  + Neu erstellen
                </Link>
              </div>
              <select className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary">
                <option value="">Bitte wählen...</option>
                {mockManufacturers.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            {/* Motor Dropdown */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-400">Motor</label>
                <Link href="/engines/new" className="text-xs text-primary hover:underline">
                  + Neu erstellen
                </Link>
              </div>
              <select className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary">
                <option value="">Bitte wählen...</option>
                {mockEngines.map((e) => (
                  <option key={e.id} value={e.id}>{e.code} ({e.hp} PS)</option>
                ))}
              </select>
            </div>
          </div>

          {/* Speichern Button */}
          <div className="mt-8 flex justify-end">
            <button type="button" className="rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-blue-600 hover:shadow-primary/30">
              Auto Speichern
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}