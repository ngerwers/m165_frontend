// src/app/components/DeleteButton.tsx
"use client"; // GANZ WICHTIG: Das sagt Next.js, dass dies interaktiv im Browser läuft

import { useRouter } from "next/navigation";
import { deleteEngine, deleteCar, deleteManufacturer } from "../../lib/api";

interface DeleteButtonProps {
  id: string;
  type: "engine" | "car" | "manufacturer";
}

export default function DeleteButton({ id, type }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    // 1. Benutzer zur Sicherheit fragen
    const confirmDelete = window.confirm("Möchtest du diesen Eintrag wirklich unwiderruflich löschen?");
    if (!confirmDelete) return;

    // 2. Je nach Typ die richtige Lösch-Funktion aus der api.ts aufrufen
    try {
      if (type === "engine") await deleteEngine(id);
      if (type === "car") await deleteCar(id);
      if (type === "manufacturer") await deleteManufacturer(id);

      // 3. Zurück zur Startseite navigieren und die Daten neu laden
      router.push("/");
      router.refresh(); 
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
      alert("Es gab einen Fehler beim Löschen.");
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white shadow-md transition-colors hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-lg"
    >
      Löschen
    </button>
  );
}