"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getManufacturerById, updateManufacturer } from "@/src/lib/api";

export default function EditManufacturerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "", country: "", founded: "", hq: "", ceo: "", stock: "", employees: "", web: ""
  });

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      const m = await getManufacturerById(id);
      if (m) {
        setFormData({
          name: m.name, country: m.country, founded: m.founded?.toString() || "",
          hq: m.hq, ceo: m.ceo, stock: m.stock, employees: m.employees?.toString() || "", web: m.web
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
      const dataToSubmit = {
        ...formData, founded: Number(formData.founded), employees: Number(formData.employees)
      };
      await updateManufacturer(id, dataToSubmit);
      router.push(`/manufacturers/${id}`);
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
      <Link href={`/manufacturers/${id}`} className="mb-8 inline-block text-accent transition-colors hover:text-primary">&larr; Abbrechen</Link>

      <div className="rounded-3xl border border-gray-500/20 bg-secondary p-8 shadow-xl md:p-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Marke bearbeiten</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Markenname</label><input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Land</label><input required type="text" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Hauptsitz</label><input required type="text" value={formData.hq} onChange={e => setFormData({...formData, hq: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Gründungsjahr</label><input required type="number" value={formData.founded} onChange={e => setFormData({...formData, founded: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">CEO</label><input required type="text" value={formData.ceo} onChange={e => setFormData({...formData, ceo: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Mitarbeiter</label><input required type="number" value={formData.employees} onChange={e => setFormData({...formData, employees: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Aktienkürzel</label><input required type="text" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
            <div className="flex flex-col"><label className="mb-2 text-sm text-gray-400">Webseite</label><input required type="text" value={formData.web} onChange={e => setFormData({...formData, web: e.target.value})} className="rounded-lg bg-background p-3 text-foreground" /></div>
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