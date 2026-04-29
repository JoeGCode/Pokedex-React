import { PokemonStat } from "@/types/custom.types";
import { CSSProperties } from "react";

type PokemonStatBarType = {
  stat: PokemonStat;
  primaryColourHex: string;
};

export default function PokemonStatBar({
  stat,
  primaryColourHex,
}: PokemonStatBarType) {
  const percentage = Math.min(100, Math.round((stat.value / 255) * 100));
  const backgroundStyle: CSSProperties = {
    backgroundColor: primaryColourHex,
    backgroundImage: "linear-gradient(rgb(0 0 0/40%) 0 0)",
  };
  const fillStyle: CSSProperties = {
    width: `${percentage}%`,
    backgroundColor: primaryColourHex,
  };

  const statLabel = (value: string) => {
    switch (value) {
      case "hp":
        return "HP";
      case "attack":
        return "Attack";
      case "defense":
        return "Defense";
      case "special-attack":
        return "Sp. Atk";
      case "special-defense":
        return "Sp. Def";
      case "speed":
        return "Speed";
      default:
        return value;
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <span className="text-sm text-secondary-text">
          {statLabel(stat.label)}
        </span>
        <span>{stat.value}</span>
      </div>
      <div style={backgroundStyle} className="w-full h-4 rounded-xl">
        <div style={fillStyle} className="h-full rounded-xl" />
      </div>
    </div>
  );
}
