import Link from 'next/link';
import { times } from '@/utils/times';

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Poder dos Times
      </h1>

      <ul className="space-y-3 max-w-xl mx-auto">
        {times.map((time) => {
          const poderTotal = time.players.reduce(
            (sum, player) => sum + player.power,
            0
          );

          return (
            <li
              key={time.id}
              className="flex justify-between items-center bg-white p-4 rounded shadow"
            >
              <div>
                <strong>{time.name}</strong>
                <p className="text-sm text-gray-600">
                  Poder Total: {poderTotal}
                </p>
              </div>
              <Link
                href={`/time/${encodeURIComponent(time.name)}`}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                +
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
