'use client';

import { Team, Player } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  time: Team;
};

export default function TimeClient({ time }: Props) {
  const router = useRouter();

  const [teamState, setTeamState] = useState<Team>(time);
  const [embaralhados, setEmbaralhados] = useState<Player[]>([]);
  const [sorteados, setSorteados] = useState<Player[]>([]);
  const [jogadorAtual, setJogadorAtual] = useState<Player | null>(null);
  const [upgradeAberto, setUpgradeAberto] = useState(false);
  const [playerUpgraded, setPlayerUpgraded] = useState(false);

  const getLista = (): Player[] => {
    if (embaralhados.length === 0) {
      const lista = [...teamState.players].sort(() => Math.random() - 0.5);
      setEmbaralhados(lista);
      return lista;
    }
    return embaralhados;
  };

  const sortear = () => {
    if (sorteados.length >= 11) return;
    const lista = getLista();
    const jogador = lista[sorteados.length];
    if (!jogador) return;
    setJogadorAtual(jogador);
    setSorteados((prev) => [...prev, jogador]);
  };

  const proximoSorteio = () => {
    setJogadorAtual(null);
    sortear();
  };

  const upgradePlayer = (playerName: string) => {
    setEmbaralhados([]);
    setSorteados([]);
    setJogadorAtual(null);

    setTeamState((prev) => {
      const updatedPlayers = prev.players.map((p) =>
        p.name === playerName ? { ...p, power: Math.min(23, p.power + 1) } : p
      );
      const updatedTeam = { ...prev, players: updatedPlayers };
      localStorage.setItem('team', JSON.stringify(updatedTeam));
      return updatedTeam;
    });

    setPlayerUpgraded(true);
    setUpgradeAberto(false);
  };

  const terminou = sorteados.length === 11;

  return (
    <>
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-center text-emerald-400 mb-6">
          {teamState.name} ⚡
        </h1>
        <div className="flex flex-col w-full max-w-xl gap-3 mb-6">
          {!playerUpgraded && !upgradeAberto && (
            <button
              onClick={() => setUpgradeAberto(true)}
              className="w-full bg-yellow-500 text-black py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              ⬆️ Upgrade de Jogador
            </button>
          )}
          {!terminou && !upgradeAberto && (
            <button
              onClick={sortear}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 transition"
            >
              Sortear jogador ({sorteados.length}/11)
            </button>
          )}
        </div>
        <ul className="w-full max-w-xl space-y-2 mb-6">
          {sorteados.map((player, index) => (
            <li
              key={`${player.name}-${index}`}
              className="flex justify-between items-center bg-gradient-to-r from-zinc-800 to-zinc-700 p-3 rounded-lg shadow-md"
            >
              <span className="font-medium text-emerald-400">{player.name}</span>
              <span className="font-bold text-emerald-400">⚡ {player.power}</span>
            </li>
          ))}
        </ul>
        {terminou && (
          <button
            onClick={() => router.push('/')}
            className="w-full max-w-xl bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition"
          >
            Voltar para Home
          </button>
        )}
      </div>
      {jogadorAtual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative bg-zinc-900 rounded-3xl p-8 w-96 text-center shadow-xl border-2 border-emerald-400 animate-scale-in">
            {!terminou && (
              <button
                onClick={proximoSorteio}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl font-bold text-emerald-400 hover:scale-110 transition"
                aria-label="Próximo sorteio"
              >
                ➜
              </button>
            )}
            <h2 className="text-2xl font-bold mb-4 text-white">Jogador Sorteado</h2>
            <p className="text-xl font-semibold mb-6 text-emerald-300">{jogadorAtual.name}</p>
            <div className="text-7xl font-extrabold text-emerald-500 mb-6">
              {jogadorAtual.power}
            </div>
            <button
              onClick={() => setJogadorAtual(null)}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-500 transition"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
      {upgradeAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-zinc-900 rounded-3xl p-6 w-96 shadow-xl border-2 border-yellow-400">
            <h2 className="text-2xl font-bold text-center mb-4 text-yellow-400">
              ⬆️ Upgrade de Jogador
            </h2>
            <p className="text-center text-sm mb-4 text-zinc-300">
              Escolha 1 jogador para ganhar <strong>+1 de poder</strong>
            </p>
            <ul className="space-y-2 max-h-72 overflow-y-auto">
              {teamState.players.map((player, index) => (
                <li key={index}>
                  <button
                    disabled={player.power >= 23}
                    onClick={() => upgradePlayer(player.name)}
                    className="w-full flex justify-between px-4 py-2 bg-zinc-800 text-zinc-100 rounded-lg hover:bg-green-600 disabled:opacity-50 transition"
                  >
                    <span>{player.name}</span>
                    <span className="font-bold text-emerald-400">
                      {player.power} ➜ {Math.min(23, player.power + 1)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setUpgradeAberto(false)}
              className="w-full mt-4 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
