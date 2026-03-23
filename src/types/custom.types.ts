export type PokemonCardData = {
  formattedId: string;
  name: string;
  imageUrl: string;
  backgroundStyle: string;
  primaryTypeColour: string;
  types: string[];
};

export type PokemonFullDetailsData = {
  formattedId: string;
  name: string;
  imageUrl: string;
  backgroundStyle: string;
  types: string[];
  description: string;
  genus: string;
  height: number;
  weight: number;
  primaryType: string;
  abilities: string[];
};
