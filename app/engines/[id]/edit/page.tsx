"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getEngineById, updateEngine } from "@/src/lib/api";

export default function EditEnginePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [formData, setFormData] = useState({
    code: "", type: "ICE", hp: "", nm: "", weight_kg: "", fuel: "", cylinders: "",
    battery_kwh: "", voltage: "", charging_kw: ""
  });

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      const e = await getEngineById(id);
      if (e) {
        setFormData({
          code: e.code, type: e.type, hp: e.hp?.toString() || "", nm: e.nm?.toString() || "",
          weight_kg: e.weight_kg?.toString() || "", fuel: e.fuel || "", cylinders: e.cylinders?.toString() || "",
          battery_kwh: e.battery_kwh?.toString() || "", voltage: e.voltage?.toString() || "", charging_kw: e.charging_kw?.toString() || ""
        });
      }
      setIsFetching(false);
    }
    loadData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const dataToSubmit: any = {
        code: formData.code, type: formData.type, hp: Number(formData.hp),
        nm: Number(formData.nm), weight_kg: Number(formData.weight_kg),
      };

      if (formData.fuel) dataToSubmit.fuel = formData.fuel;
      if (formData.cylinders) dataToSubmit.cylinders = Number(formData.cylinders);
      if (formData.battery_kwh) dataToSubmit.battery_kwh = Number(formData.battery_kwh);
      if (formData.voltage) dataToSubmit.voltage = Number(formData.voltage);
      if (formData.charging_kw) dataToSubmit.charging_kw = Number(formData.charging_kw);

      await updateEngine(id, dataToSubmit);
      router.push(`/engines/${id}`);
      router.refresh();
    } catch (error) {
      console.error("Fehler:", error);
      alert("Fehler beim Speichern.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <div className="p-12 text-center text-primary">Lade Daten...</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href={`/engines/${id}`} className="mb-8 inline-block text-accent transition-colors hover:text-primary">&larr; Abbrechen</Link>

      <div className="rounded-3xl border border-gray-500/20 bg-secondary p-8 shadow-xl md:p-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Motor bearbeiten</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Motor-Code</label><input required type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Antriebsart</label><select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="rounded-lg bg-background p-3 text-foreground"><option value="ICE">Verbrenner (ICE)</option><option value="EV">Elektro (EV)</option><option value="Hybrid">Hybrid</option></select></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Leistung (PS)</label><input required type="number" value={formData.hp} onChange={e => setFormData({...formData, hp: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Drehmoment (Nm)</label><input required type="number" value={formData.nm} onChange={e => setFormData({...formData, nm: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Gewicht (kg)</label><input required type="number" value={formData.weight_kg} onChange={e => setFormData({...formData, weight_kg: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            
            {/* Optionale Felder, die sich je nach Typ anbieten */}
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Treibstoff (z.B. Benzin)</label><input type="text" value={formData.fuel} onChange={e => setFormData({...formData, fuel: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Zylinder (ICE)</label><input type="number" value={formData.cylinders} onChange={e => setFormData({...formData, cylinders: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Batterie (kWh) (EV)</label><input type="number" value={formData.battery_kwh} onChange={e => setFormData({...formData, battery_kwh: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Spannung (V) (EV)</label><input type="number" value={formData.voltage} onChange={e => setFormData({...formData, voltage: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Ladeleistung (kW) (EV)</label><input type="number" value={formData.charging_kw} onChange={e => setFormData({...formData, charging_kw: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
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