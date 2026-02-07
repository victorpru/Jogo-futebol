import { times } from '@/utils/times';
import TimeClient from './TimeClient';

export default async function TimePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const time = times.find(
    t => t.name === decodeURIComponent(name)
  );

  if (!time) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Time não encontrado
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <TimeClient time={time} />
    </main>
  );
}
