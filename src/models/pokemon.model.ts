export interface PokemonListModel {
  count: number;
  next: string;
  previous: any;
  results: PokemonModel[];
}

export interface PokemonModel {
  id: number;
  name: string;
  url: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  location_area_encounters: string;
  sprites: Sprites;
  selected?: boolean;
}

export interface Sprites {
  front_default: string;
  other: Other;
}

export interface Other {
  'official-artwork': OfficialArtwork;
}

export interface OfficialArtwork {
  front_default: string;
}
