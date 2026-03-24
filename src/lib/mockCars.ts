// src/lib/mockCars.ts

export const mockManufacturers = [
  { id: "m1", name: "Porsche", country: "Germany", founded: 1931, hq: "Stuttgart", ceo: "Oliver Blume", employees: 39165 },
  { id: "m2", name: "Tesla", country: "USA", founded: 2003, hq: "Austin", ceo: "Elon Musk", employees: 140473 },
  { id: "m3", name: "BMW", country: "Germany", founded: 1916, hq: "Munich", ceo: "Oliver Zipse", employees: 149000 },
  { id: "m4", name: "Rimac", country: "Croatia", founded: 2009, hq: "Sveta Nedelja", ceo: "Mate Rimac", employees: 2000 }
];

export const mockEngines = [
  { id: "e1", code: "B6-4.0", type: "ICE", hp: 650, nm: 850, displacement_ccm: 3996, cylinders: 6, fuel: "Benzin", weight_kg: 210 },
  { id: "e2", code: "Plaid-Tri", type: "EV", hp: 1020, nm: 1420, battery_kwh: 100, voltage: 800, charging_kw: 250, weight_kg: 185 },
  { id: "e3", code: "I6-3.0", type: "ICE", hp: 510, nm: 650, displacement_ccm: 2993, cylinders: 6, fuel: "Benzin", weight_kg: 170 },
  { id: "e4", code: "Rimac-Q", type: "EV", hp: 1914, nm: 2360, battery_kwh: 120, voltage: 800, charging_kw: 500, weight_kg: 250 }
];

const rawCars = [
  {
    id: "65f1a2b3c4d5e6f7a8b9c001", model: "911 Turbo S", year: 2024, cat: "Sport", price: 270000,
    colors: ["Silver", "Black", "White", "Guards Red"],
    specs: { drive: "AWD", top_speed_kmh: 330, weight_kg: 1640, seats: 4 },
    engine_id: "e1", manufacturer_id: "m1"
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c002", model: "Model S Plaid", year: 2024, cat: "Sedan", price: 110000,
    colors: ["Red", "White", "Black", "Silver"],
    specs: { drive: "AWD", top_speed_kmh: 322, weight_kg: 2162, seats: 5, range_km: 600 },
    engine_id: "e2", manufacturer_id: "m2"
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c003", model: "M3 Competition", year: 2024, cat: "Sedan", price: 105000,
    colors: ["Blue", "Black", "White"],
    specs: { drive: "RWD", top_speed_kmh: 290, weight_kg: 1730, seats: 5 },
    engine_id: "e3", manufacturer_id: "m3"
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c004", model: "Nevera", year: 2024, cat: "Hypercar", price: 2000000,
    colors: ["Blue", "Carbon Black"],
    specs: { drive: "AWD", top_speed_kmh: 412, weight_kg: 1900, seats: 2, range_km: 550 },
    engine_id: "e4", manufacturer_id: "m4"
  }
];

export const mockCars = rawCars.map(car => {
  const manufacturerObj = mockManufacturers.find(m => m.id === car.manufacturer_id);
  const engineObj = mockEngines.find(e => e.id === car.engine_id);

  return {
    ...car,
    manufacturer: manufacturerObj ? manufacturerObj.name : "Unbekannt",
    fullManufacturerDetails: manufacturerObj, 
    engine: engineObj || { id: "0", code: "Unknown", type: "Unknown", hp: 0, nm: 0 } 
  };
});