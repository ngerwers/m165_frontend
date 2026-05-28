import Link from 'next/link';
import CarCard from '../src/app/components/carCard';
import { getAllCars } from '../src/lib/api'; 


function getRandomCars(cars: any[], count: number) {
  const shuffled = [...cars];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export default async function NotFound() {
  const allCars = await getAllCars();
  
  const featured = getRandomCars(allCars, 3);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="max-w-2xl text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Seite nicht gefunden</h2>
        <p className="text-gray-600 mb-6">Du hast wohl die falsche Route genommen...</p>
        <p className="text-gray-600 mb-8">Vielleicht findest du deinen Traumwagen hier:</p>

        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Zurück zur Startseite"
          >
            Zurück zur Startseite
          </Link>
          <Link
            href="/"
            className="inline-block px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Zu den Fahrzeugen"
          >
            Zu den Fahrzeugen
          </Link>
        </div>
      </div>

      {featured.length > 0 && (
        <div className="w-full max-w-5xl mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((car) => (
              <div key={car.id} className="h-56">
                <CarCard car={car} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}