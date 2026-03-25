// src/app/cars/[id]/edit/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCarById, updateCar, getAllManufacturers, getAllEngines } from "@/src/lib/api";

export default function EditCarPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [manufacturers, setManufacturers] = useState<any[]>([]);
  const [engines, setEngines] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    model: "", cat: "", year: "", price: "", drive: "RWD",
    top_speed_kmh: "", weight_kg: "", seats: "", colorInput: "",
    manufacturer_id: "", engine_id: ""
  });

  // Lädt die aktuellen Auto-Daten und die Dropdowns, wenn die Seite geöffnet wird
  useEffect(() => {
    async function loadData() {
      if (!id) return;
      const [car, mfs, engs] = await Promise.all([
        getCarById(id), getAllManufacturers(), getAllEngines()
      ]);
      
      if (car) {
        setFormData({
          model: car.model, cat: car.cat, year: car.year.toString(), price: car.price.toString(),
          drive: car.specs?.drive || "RWD", top_speed_kmh: car.specs?.top_speed_kmh?.toString() || "",
          weight_kg: car.specs?.weight_kg?.toString() || "", seats: car.specs?.seats?.toString() || "",
          colorInput: car.colors ? car.colors.join(", ") : "",
          manufacturer_id: car.manufacturer_id, engine_id: car.engine_id
        });
      }
      setManufacturers(mfs);
      setEngines(engs);
      setIsFetching(false);
    }
    loadData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const colorsArray = formData.colorInput.split(",").map(c => c.trim()).filter(c => c !== "");
      const dataToSubmit = {
        model: formData.model, cat: formData.cat, year: Number(formData.year), price: Number(formData.price),
        colors: colorsArray,
        specs: {
          drive: formData.drive, top_speed_kmh: Number(formData.top_speed_kmh),
          weight_kg: Number(formData.weight_kg), seats: Number(formData.seats)
        },
        manufacturer_id: formData.manufacturer_id, engine_id: formData.engine_id
      };

      await updateCar(id, dataToSubmit);
      router.push(`/cars/${id}`); // Zurück zur Detailseite des Autos
      router.refresh();
    } catch (error) {
      console.error("Fehler beim Update:", error);
      alert("Fehler beim Speichern.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <div className="p-12 text-center text-primary">Lade Daten...</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href={`/cars/${id}`} className="mb-8 inline-block text-accent transition-colors hover:text-primary">&larr; Abbrechen</Link>

      <div className="rounded-3xl border border-gray-500/20 bg-secondary p-8 shadow-xl md:p-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Auto bearbeiten</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Modell</label><input required type="text" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Kategorie</label><input required type="text" value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Baujahr</label><input required type="number" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Preis (€)</label><input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Antrieb</label><select required value={formData.drive} onChange={e => setFormData({...formData, drive: e.target.value})} className="rounded-lg bg-background p-3 text-foreground"><option value="RWD">RWD</option><option value="AWD">AWD</option><option value="FWD">FWD</option></select></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Sitze</label><input required type="number" value={formData.seats} onChange={e => setFormData({...formData, seats: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Top Speed (km/h)</label><input required type="number" value={formData.top_speed_kmh} onChange={e => setFormData({...formData, top_speed_kmh: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Gewicht (kg)</label><input required type="number" value={formData.weight_kg} onChange={e => setFormData({...formData, weight_kg: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            
            <div className="flex flex-col md:col-span-2"><label className="mb-2 text-sm text-gray-400">Farben (durch Komma getrennt)</label><input required type="text" value={formData.colorInput} onChange={e => setFormData({...formData, colorInput: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Hersteller</label><select required value={formData.manufacturer_id} onChange={e => setFormData({...formData, manufacturer_id: e.target.value})} className="rounded-lg bg-background p-3 text-foreground"><option value="" disabled>Bitte wählen...</option>{manufacturers.map((m) => (<option key={m.id} value={m.id}>{m.name}</option>))}</select></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Motor</label><select required value={formData.engine_id} onChange={e => setFormData({...formData, engine_id: e.target.value})} className="rounded-lg bg-background p-3 text-foreground"><option value="" disabled>Bitte wählen...</option>{engines.map((e) => (<option key={e.id} value={e.id}>{e.code} ({e.hp} PS)</option>))}</select></div>
          </div>

          <div className="mt-8 flex justify-end">
            <button disabled={isLoading} type="submit" className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-500 disabled:opacity-50">
              {isLoading ? "Speichert..." : "Änderungen speichern"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}