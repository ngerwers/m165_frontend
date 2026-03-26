"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEngine } from "@/src/lib/api";

export default function NewEnginePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    type: "ICE", 
    hp: "",
    nm: "",
    weight_kg: "",
    fuel: "Benzin", 
    cylinders: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dataToSubmit: any = {
        code: formData.code,
        type: formData.type,
        hp: Number(formData.hp),
        nm: Number(formData.nm),
        weight_kg: Number(formData.weight_kg),
      };

      if (formData.fuel) dataToSubmit.fuel = formData.fuel;
      if (formData.cylinders) dataToSubmit.cylinders = Number(formData.cylinders);

      await createEngine(dataToSubmit);
      
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Fehler beim Erstellen des Motors:", error);
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
        <h1 className="mb-8 text-4xl font-bold text-foreground">Neuen Motor anlegen</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Motor-Code</label>
              <input required type="text" placeholder="z.B. V8-4.0" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Antriebsart</label>
              <select required value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary">
                <option value="ICE">Verbrenner (ICE)</option>
                <option value="EV">Elektro (EV)</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Leistung (PS)</label>
              <input required type="number" placeholder="z.B. 650" value={formData.hp} onChange={(e) => setFormData({...formData, hp: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Drehmoment (Nm)</label>
              <input required type="number" placeholder="z.B. 850" value={formData.nm} onChange={(e) => setFormData({...formData, nm: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Gewicht (kg)</label>
              <input required type="number" placeholder="z.B. 210" value={formData.weight_kg} onChange={(e) => setFormData({...formData, weight_kg: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-gray-400">Treibstoff (Optional)</label>
              <input type="text" placeholder="z.B. Benzin" value={formData.fuel} onChange={(e) => setFormData({...formData, fuel: e.target.value})} className="rounded-lg border border-gray-500/30 bg-background p-3 text-foreground outline-none focus:border-primary" />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button disabled={isLoading} type="submit" className="rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-blue-600 hover:shadow-primary/30 disabled:opacity-50">
              {isLoading ? "Speichert..." : "Motor Speichern"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}