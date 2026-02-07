export interface Player {
    name: string;
    power: number;
}

export interface Team {
    id?: number;
    name: string;
    players: Player[];
}