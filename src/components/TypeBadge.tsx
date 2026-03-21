import { typeColours } from "../utils/consts";

const TypeBadge = ({ type }: { type: string }) => {
  const colour = typeColours[type];
  return (
    <div
      style={{
        backgroundColor: colour,
      }}
      className="text-center uppercase text-white border-white border p-1 text-sm rounded-full"
    >
      <span className="font-bold drop-shadow-[0_0_1px_#000]">{type}</span>
    </div>
  );
};

export default TypeBadge;
