import { CSSProperties } from "react";
import { typeColours } from "../utils/consts";

type PokemonStatBarType = {
  value: number;
  label: string;
  mainType: string;
};

export default function PokemonStatBar({
  value,
  label,
  mainType,
}: PokemonStatBarType) {
  const percentage = Math.round((value / 255) * 100);
  const backgroundStyle: CSSProperties = {
    backgroundColor: typeColours[mainType],
    backgroundImage: "linear-gradient(rgb(0 0 0/40%) 0 0)",
  };
  const fillStyle: CSSProperties = {
    height: `${percentage}%`,
    backgroundColor: typeColours[mainType],
  };
  return (
    <div className="flex flex-col">
      <div style={backgroundStyle} className="h-[255px] relative">
        <div className="absolute bottom-2 left-0 right-0 text-center z-10">
          {value}
        </div>
        <div style={fillStyle} className="absolute bottom-0 left-0 right-0" />
      </div>
      <span className="text-xs w-full text-center md:text-base">{label}</span>
    </div>
  );
}
