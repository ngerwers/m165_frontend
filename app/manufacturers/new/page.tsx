// src/app/manufacturers/new/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createManufacturer } from "@/src/lib/api";

export default function NewManufacturerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Unser State für die Formulardaten
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    founded: "",
    hq: "",
    ceo: "",
    stock: "",
    employees: "",
    web: ""
  });

  // Funktion zum Speichern in der Datenbank
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Verhindert, dass die Seite neu lädt
    setIsLoading(true);

    try {
      // Wir wandeln Zahlen (wie Gründungsjahr und Mitarbeiter) um, da das Backend das erwartet
      const dataToSubmit = {
        ...formData,
        founded: Number(formData.founded),
        employees: Number(formData.employees)
      };

      await createManufacturer(dataToSubmit);
      
      // Zurück zur Startseite und Daten neu laden
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Fehler beim Erstellen des Herstellers:", error);
      alert("Es gab einen Fehler beim Speichern.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/" className="mb-8 inline-block text-accent transition-colors hover:text-primary">
        &larr; Abbrechen & Zurück
      </Link>

      <div className="rounded-3xl border border-gray-500/20 bg-secondary p-8 shadow-xl md:p-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Neuen Hersteller anlegen</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Markenname</label>
              <input required type="text" placeholder="z.B. Audi" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Land</label>
              <input required type="text" placeholder="z.B. Germany" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Hauptsitz (Stadt)</label>
              <input required type="text" placeholder="z.B. Ingolstadt" value={formData.hq} onChange={(e) => setFormData({...formData, hq: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Gründungsjahr</label>
              <input required type="number" placeholder="z.B. 1909" value={formData.founded} onChange={(e) => setFormData({...formData, founded: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">CEO / Geschäftsführer</label>
              <input required type="text" placeholder="z.B. Gernot Döllner" value={formData.ceo} onChange={(e) => setFormData({...formData, ceo: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Anzahl Mitarbeiter</label>
              <input required type="number" placeholder="z.B. 87000" value={formData.employees} onChange={(e) => setFormData({...formData, employees: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Aktienkürzel (Stock)</label>
              <input required type="text" placeholder="z.B. NSU" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Webseite</label>
              <input required type="text" placeholder="z.B. audi.com" value={formData.web} onChange={(e) => setFormData({...formData, web: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button disabled={isLoading} type="submit" className="rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-blue-600 hover:shadow-primary/30 disabled:opacity-50">
              {isLoading ? "Speichert..." : "Hersteller Speichern"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}