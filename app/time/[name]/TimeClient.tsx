'use client';

import { Team, Player } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  time: Team;
};

export default function TimeClient({ time }: Props) {
  const router = useRouter();

  const [embaralhados, setEmbaralhados] = useState<Player[]>([]);
  const [sorteados, setSorteados] = useState<Player[]>([]);
  const [jogadorAtual, setJogadorAtual] = useState<Player | null>(null);

  function getLista(): Player[] {
    if (embaralhados.length === 0) {
      const lista = [...time.players].sort(() => Math.random() - 0.5);
      setEmbaralhados(lista);
      return lista;
    }
    return embaralhados;
  }

  function sortear() {
    if (sorteados.length >= 11) return;

    const lista = getLista();
    const jogador = lista[sorteados.length];
    if (!jogador) return;

    setJogadorAtual(jogador);
    setSorteados((prev) => [...prev, jogador]);
  }

  function proximoSorteio() {
    setJogadorAtual(null);
    sortear();
  }

  const terminou = sorteados.length === 11;

  return (
    <>
      <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-xl font-bold mb-4 text-center">
          {time.name}
        </h1>

        {!terminou && (
          <button
            onClick={sortear}
            className="w-full bg-green-600 text-white py-2 rounded mb-4"
          >
            Sortear jogador ({sorteados.length}/11)
          </button>
        )}

        <ul className="space-y-2 mb-4">
          {sorteados.map((player, index) => (
            <li
              key={`${player.name}-${index}`}
              className="flex justify-between bg-gray-100 p-2 rounded"
            >
              <span>{player.name}</span>
              <span>Poder {player.power}</span>
            </li>
          ))}
        </ul>

        {terminou && (
          <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Voltar para Home
          </button>
        )}
      </div>
      {jogadorAtual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative bg-white rounded-2xl p-8 w-80 text-center shadow-xl animate-scale-in">
            {!terminou && (
              <button
                onClick={proximoSorteio}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl font-bold text-green-600 hover:scale-110 transition"
                aria-label="Próximo sorteio"
              >
                ➜
              </button>
            )}

            <h2 className="text-xl font-bold mb-4">
              Jogador Sorteado
            </h2>

            <p className="text-lg font-semibold mb-6">
              {jogadorAtual.name}
            </p>

            <div className="text-6xl font-extrabold text-green-600 mb-6">
              {jogadorAtual.power}
            </div>

            <button
              onClick={() => setJogadorAtual(null)}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
