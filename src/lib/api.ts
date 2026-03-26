
const API_URL = "http://127.0.0.1:5000";

function formatMongoDoc(doc: any) {
  if (!doc) return null;
  return {
    ...doc,
    id: doc._id,
    manufacturer_id: doc.manufacturer?._id || doc.manufacturer_id,
    engine_id: doc.engine?._id || doc.engine_id,
  };
}

export async function getAllCars() {
  try {
    const res = await fetch(`${API_URL}/car_models/details`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Netzwerkfehler");
    const data = await res.json();
    
    return data.map((car: any) => ({
      ...formatMongoDoc(car),
      manufacturer: car.manufacturer?.name,
      engine: formatMongoDoc(car.engine)
    }));
  } catch (error) {
    console.error("Fehler beim Laden aller Autos:", error);
    return [];
  }
}

export async function getCarById(id: string) {
  try {
    const res = await fetch(`${API_URL}/car_models/${id}/details`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    
    return {
      ...formatMongoDoc(data),
      manufacturer: data.manufacturer?.name,
      engine: formatMongoDoc(data.engine)
    };
  } catch (error) {
    console.error(`Fehler beim Laden von Auto ${id}:`, error);
    return null;
  }
}

export async function createCar(data: any) {
  const res = await fetch(`${API_URL}/car_models`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateCar(id: string, data: any) {
  const res = await fetch(`${API_URL}/car_models/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteCar(id: string) {
  const res = await fetch(`${API_URL}/car_models/${id}`, {
    method: "DELETE",
  });
  return res.json();
}


export async function getAllManufacturers() {
  try {
    const res = await fetch(`${API_URL}/manufacturers`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Netzwerkfehler");
    const data = await res.json();
    return data.map(formatMongoDoc);
  } catch (error) {
    console.error("Fehler beim Laden der Hersteller:", error);
    return [];
  }
}

export async function getManufacturerById(id: string) {
  try {
    const res = await fetch(`${API_URL}/manufacturers/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return formatMongoDoc(data);
  } catch (error) {
    console.error(`Fehler beim Laden von Hersteller ${id}:`, error);
    return null;
  }
}

export async function createManufacturer(data: any) {
  const res = await fetch(`${API_URL}/manufacturers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateManufacturer(id: string, data: any) {
  const res = await fetch(`${API_URL}/manufacturers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteManufacturer(id: string) {
  const res = await fetch(`${API_URL}/manufacturers/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function getCarsByManufacturer(manufacturerId: string) {
  const allCars = await getAllCars();
  return allCars.filter((car: any) => car.manufacturer_id === manufacturerId);
}

export async function getAllEngines() {
  try {
    const res = await fetch(`${API_URL}/engines`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Netzwerkfehler");
    const data = await res.json();
    return data.map(formatMongoDoc);
  } catch (error) {
    console.error("Fehler beim Laden der Motoren:", error);
    return [];
  }
}

export async function getEngineById(id: string) {
  try {
    const res = await fetch(`${API_URL}/engines/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return formatMongoDoc(data);
  } catch (error) {
    console.error(`Fehler beim Laden von Motor ${id}:`, error);
    return null;
  }
}

export async function createEngine(data: any) {
  const res = await fetch(`${API_URL}/engines`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateEngine(id: string, data: any) {
  const res = await fetch(`${API_URL}/engines/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteEngine(id: string) {
  const res = await fetch(`${API_URL}/engines/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function getCarsByEngine(engineId: string) {
  const allCars = await getAllCars();
  return allCars.filter((car: any) => car.engine_id === engineId);
}