"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Player = {
    name: string;
    power: number;
    value: number; // em milhões
};

type Team = {
    goleiro: Player[];
    laterais: Player[];
    zagueiros: Player[];
    volante: Player[];
    meias: Player[];
    atacantes: Player[];
};

const STORAGE_KEY = "meu-time";

const createPlayer = (): Player => ({
    name: "",
    power: 0,
    value: 0,
});

const initialTeam: Team = {
    goleiro: [createPlayer()],
    laterais: Array.from({ length: 2 }, createPlayer),
    zagueiros: Array.from({ length: 2 }, createPlayer),
    volante: [createPlayer()],
    meias: Array.from({ length: 2 }, createPlayer),
    atacantes: Array.from({ length: 3 }, createPlayer),
};

export default function CadastroTimePage() {
    const [team, setTeam] = useState<Team>(() => {
        if (typeof window === "undefined") {
            return initialTeam;
        }

        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : initialTeam;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
    }, [team]);

    const updatePlayer = (
        position: keyof Team,
        index: number,
        field: keyof Player,
        value: string | number
    ) => {
        setTeam((prev) => ({
            ...prev,
            [position]: prev[position].map((p, i) =>
                i === index ? { ...p, [field]: value } : p
            ),
        }));
    };

    const allPlayers = Object.values(team).flat();

    const totalPower = allPlayers.reduce((sum, p) => sum + p.power, 0);
    const totalValue = allPlayers.reduce((sum, p) => sum + p.value, 0);

    const renderSection = (
        title: string,
        position: keyof Team
    ) => (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>

            <div className="grid md:grid-cols-2 gap-4">
                {team[position].map((player, index) => (
                    <div
                        key={index}
                        className="bg-zinc-900 p-4 rounded-lg space-y-3"
                    >
                        <label className="text-sm font-medium">
                            Nome
                            <input
                                type="text"
                                value={player.name}
                                onChange={(e) =>
                                    updatePlayer(position, index, "name", e.target.value)
                                }
                                className="w-full mt-1 px-3 py-2 rounded bg-zinc-800 border border-zinc-700"
                            />
                        </label>

                        <label className="text-sm font-medium">
                            Poder (máx 23)
                            <input
                                type="number"
                                min={0}
                                max={23}
                                value={player.power}
                                onChange={(e) =>
                                    updatePlayer(
                                        position,
                                        index,
                                        "power",
                                        Math.min(23, Number(e.target.value))
                                    )
                                }
                                className="w-full mt-1 px-3 py-2 rounded bg-zinc-800 border border-zinc-700"
                            />
                        </label>

                        <label className="text-sm font-medium">
                            Valor (em milhões)
                            <div className="flex items-center gap-2 mt-1">
                                <input
                                    type="number"
                                    min={0}
                                    value={player.value}
                                    onChange={(e) =>
                                        updatePlayer(
                                            position,
                                            index,
                                            "value",
                                            Number(e.target.value)
                                        )
                                    }
                                    className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700"
                                />
                                <span className="text-sm text-zinc-400">milhões</span>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <header className="flex items-center justify-between px-6 py-4 bg-zinc-900">
                <h1 className="text-2xl font-bold">Cadastro do Time</h1>
                <Link
                    href="/"
                    className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-500"
                >
                    Home
                </Link>
            </header>
            <div className="max-w-6xl mx-auto px-6 mt-6">
                <div className="flex flex-col md:flex-row justify-between gap-4 bg-zinc-900 p-4 rounded-lg mb-8">
                    <span>
                        ⚡ Poder total: <strong>{totalPower}</strong>
                    </span>
                    <span>
                        💰 Valor total: <strong>{totalValue} milhões</strong>
                    </span>
                </div>

                {renderSection("Goleiro", "goleiro")}
                {renderSection("Laterais", "laterais")}
                {renderSection("Zagueiros", "zagueiros")}
                {renderSection("Volante", "volante")}
                {renderSection("Meias", "meias")}
                {renderSection("Atacantes", "atacantes")}
            </div>
        </div>
    );
}
