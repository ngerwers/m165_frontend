// src/lib/mockCars.ts

export const mockCars = [
  {
    id: "65f1a2b3c4d5e6f7a8b9c001",
    manufacturer: "Porsche",
    model: "911 Turbo S",
    year: 2024,
    cat: "Sport",
    price: 270000,
    colors: ["Silver", "Black", "White", "Guards Red"],
    specs: { drive: "AWD", top_speed_kmh: 330, weight_kg: 1640, seats: 4 },
    engine: { type: "ICE", hp: 650, nm: 850, cylinders: 6 }
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c002",
    manufacturer: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    cat: "Sedan",
    price: 110000,
    colors: ["Red", "White", "Black", "Silver"],
    specs: { drive: "AWD", top_speed_kmh: 322, weight_kg: 2162, seats: 5, range_km: 600 },
    engine: { type: "EV", hp: 1020, nm: 1420, battery_kwh: 100 }
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c003",
    manufacturer: "BMW",
    model: "M3 Competition",
    year: 2024,
    cat: "Sedan",
    price: 105000,
    colors: ["Blue", "Black", "White"],
    specs: { drive: "RWD", top_speed_kmh: 290, weight_kg: 1730, seats: 5 },
    engine: { type: "ICE", hp: 510, nm: 650, cylinders: 6 }
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c004",
    manufacturer: "Mercedes-Benz",
    model: "EQS 580",
    year: 2024,
    cat: "Luxury",
    price: 150000,
    colors: ["Black", "Silver", "White"],
    specs: { drive: "AWD", top_speed_kmh: 210, weight_kg: 2585, seats: 5, range_km: 780 },
    engine: { type: "EV", hp: 523, nm: 855, battery_kwh: 108 }
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c005",
    manufacturer: "Ferrari",
    model: "812 Competizione",
    year: 2023,
    cat: "Sport",
    price: 500000,
    colors: ["Yellow", "Red", "Black"],
    specs: { drive: "RWD", top_speed_kmh: 340, weight_kg: 1525, seats: 2 },
    engine: { type: "ICE", hp: 800, nm: 718, cylinders: 12 }
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c006",
    manufacturer: "Rimac",
    model: "Nevera",
    year: 2024,
    cat: "Hypercar",
    price: 2000000,
    colors: ["Blue", "Carbon Black"],
    specs: { drive: "AWD", top_speed_kmh: 412, weight_kg: 1900, seats: 2, range_km: 550 },
    engine: { type: "EV", hp: 1914, nm: 2360, battery_kwh: 120 }
  }
];