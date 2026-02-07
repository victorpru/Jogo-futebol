"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Player = {
  name: string;
  power: number;
  value: number;
};

export type Team = {
  goleiro: Player[];
  laterais: Player[];
  zagueiros: Player[];
  volante: Player[];
  meias: Player[];
  atacantes: Player[];
};

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

const STORAGE_KEY = "meu-time";

type TeamContextType = {
  team: Team;
  setTeam: React.Dispatch<React.SetStateAction<Team>>;
  resetTeam: () => void;
};

const TeamContext = createContext<TeamContextType | null>(null);

export function TeamProvider({ children }: { children: ReactNode }) {
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

  const resetTeam = () => {
    setTeam(initialTeam);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <TeamContext.Provider value={{ team, setTeam, resetTeam }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeam deve ser usado dentro de TeamProvider");
  }
  return context;
}
