// src/app/cars/new/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createCar, getAllManufacturers, getAllEngines } from "@/src/lib/api";

export default function NewCarPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // States für unsere Dropdown-Daten aus der Datenbank
  const [manufacturers, setManufacturers] = useState<any[]>([]);
  const [engines, setEngines] = useState<any[]>([]);

  // State für die Eingabefelder des Autos
  const [formData, setFormData] = useState({
    model: "",
    cat: "",
    year: "",
    price: "",
    drive: "RWD", // Standardwert für Antrieb
    top_speed_kmh: "",
    weight_kg: "",
    seats: "",
    colorInput: "", // Ein einzelnes Textfeld für Farben (komma-getrennt)
    manufacturer_id: "",
    engine_id: ""
  });

  // useEffect lädt die Marken und Motoren beim Öffnen der Seite
  useEffect(() => {
    async function loadDropdownData() {
      const loadedManufacturers = await getAllManufacturers();
      const loadedEngines = await getAllEngines();
      setManufacturers(loadedManufacturers);
      setEngines(loadedEngines);
    }
    loadDropdownData();
  }, []);

  // Funktion zum Speichern des neuen Autos
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Die Farben aus dem Textfeld in ein Array verwandeln
      // Wenn der User "Rot, Blau" eintippt, wird daraus ["Rot", "Blau"]
      const colorsArray = formData.colorInput
        .split(",")
        .map(color => color.trim())
        .filter(color => color !== "");

      // 2. Das Objekt so bauen, wie das Python Backend es erwartet!
      const dataToSubmit = {
        model: formData.model,
        cat: formData.cat,
        year: Number(formData.year),
        price: Number(formData.price),
        colors: colorsArray,
        specs: {
          drive: formData.drive,
          top_speed_kmh: Number(formData.top_speed_kmh),
          weight_kg: Number(formData.weight_kg),
          seats: Number(formData.seats)
        },
        manufacturer_id: formData.manufacturer_id,
        engine_id: formData.engine_id
      };

      // 3. An die API schicken
      await createCar(dataToSubmit);
      
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Fehler beim Erstellen des Autos:", error);
      alert("Fehler beim Speichern. Hast du Marke und Motor ausgewählt?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/" className="mb-8 inline-block text-accent transition-colors hover:text-primary">
        &larr; Abbrechen & Zurück
      </Link>

      <div className="rounded-3xl border border-gray-500/20 bg-secondary p-8 shadow-xl md:p-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Neues Auto anlegen</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basis-Daten */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-primary">Basis-Daten</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-400">Modell-Name</label>
                <input required type="text" placeholder="z.B. 911 GT3" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-400">Kategorie</label>
                <input required type="text" placeholder="z.B. Sport" value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-400">Baujahr</label>
                <input required type="number" placeholder="2024" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-400">Preis (€)</label>
                <input required type="number" placeholder="150000" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
              </div>
            </div>
          </div>

          <hr className="border-gray-500/20" />

          {/* Spezifikationen (Die in MongoDB als eigenes Objekt "specs" gespeichert werden) */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-primary">Spezifikationen & Farben</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-400">Antriebsart</label>
                <select required value={formData.drive} onChange={e => setFormData({...formData, drive: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary">
                  <option value="RWD">Hinterradantrieb (RWD)</option>
                  <option value="AWD">Allradantrieb (AWD)</option>
                  <option value="FWD">Vorderradantrieb (FWD)</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-400">Sitzplätze</label>
                <input required type="number" placeholder="z.B. 2" value={formData.seats} onChange={e => setFormData({...formData, seats: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-400">Höchstgeschwindigkeit (km/h)</label>
                <input required type="number" placeholder="z.B. 320" value={formData.top_speed_kmh} onChange={e => setFormData({...formData, top_speed_kmh: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-400">Gewicht (kg)</label>
                <input required type="number" placeholder="z.B. 1500" value={formData.weight_kg} onChange={e => setFormData({...formData, weight_kg: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="mb-2 text-sm font-semibold text-gray-400">Farben (durch Komma getrennt)</label>
                <input required type="text" placeholder="z.B. Rot, Silber, Schwarz" value={formData.colorInput} onChange={e => setFormData({...formData, colorInput: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
              </div>
            </div>
          </div>

          <hr className="border-gray-500/20" />

          {/* Relationen: Marke & Motor auswählen */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-primary">Verknüpfungen</h2>
            <div className="grid gap-8 md:grid-cols-2">
              
              {/* Hersteller Dropdown */}
              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-400">Hersteller</label>
                  <Link href="/manufacturers/new" className="text-xs text-primary hover:underline">
                    + Neu erstellen
                  </Link>
                </div>
                {/* Hier laden wir die echten Marken aus der MongoDB */}
                <select required value={formData.manufacturer_id} onChange={e => setFormData({...formData, manufacturer_id: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary">
                  <option value="" disabled>Bitte wählen...</option>
                  {manufacturers.map((m) => (
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
                {/* Hier laden wir die echten Motoren aus der MongoDB */}
                <select required value={formData.engine_id} onChange={e => setFormData({...formData, engine_id: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary">
                  <option value="" disabled>Bitte wählen...</option>
                  {engines.map((e) => (
                    <option key={e.id} value={e.id}>{e.code} ({e.hp} PS)</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Speichern Button */}
          <div className="mt-8 flex justify-end">
            <button disabled={isLoading} type="submit" className="rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-blue-600 hover:shadow-primary/30 disabled:opacity-50">
              {isLoading ? "Speichert..." : "Auto Speichern"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}