import { Player, Team } from "@/app/types";


const generateRandomName = (): string => {
    const firstNames = [
        "Carlos", "João", "Pedro", "Lucas", "Gabriel", "Bruno", "Diego", "Felipe", "André", "Gustavo",
        "Rodrigo", "Thiago", "Rafael", "Marcelo", "Fernando", "Leandro", "Ricardo", "Maurício", "Robson", "Wagner"
    ];
    const lastNames = [
        "Silva", "Santos", "Oliveira", "Costa", "Ferreira", "Gomes", "Pereira", "Martins", "Alves", "Rocha",
        "Souza", "Monteiro", "Barbosa", "Ribeiro", "Carvalho", "Lopes", "Freitas", "Castro", "Teixeira", "Pinto"
    ];
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${first} ${last}`;
};

const generatePlayers = (): Player[] => {
    return Array.from({ length: 11 }, () => ({
        name: generateRandomName(),
        power: Math.floor(Math.random() * (21 - 15 + 1)) + 15
    }));
};

export const times: Team[] = [
    { id: 1, name: "Flamengo", players: generatePlayers() },
    { id: 2, name: "Palmeiras", players: generatePlayers() },
    { id: 3, name: "São Paulo", players: generatePlayers() },
    { id: 4, name: "Corinthians", players: generatePlayers() },
    { id: 5, name: "Atlético Mineiro", players: generatePlayers() },
    { id: 6, name: "Botafogo", players: generatePlayers() },
    { id: 7, name: "Fluminense", players: generatePlayers() },
    { id: 8, name: "Cruzeiro", players: generatePlayers() },
    { id: 9, name: "Internacional", players: generatePlayers() },
    { id: 10, name: "Grêmio", players: generatePlayers() },
    { id: 11, name: "Bahia", players: generatePlayers() },
    { id: 12, name: "Fortaleza", players: generatePlayers() },
];