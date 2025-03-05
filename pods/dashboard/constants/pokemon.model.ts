interface Ability {
  name: string;
  url: string;
}

export interface Abilities {
  is_hidden: boolean;
  slot: number;
  ability: Ability;
}

interface Form {
  name: string;
  url: string;
}

interface Version {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  version: Version;
}

interface Item {
  name: string;
  url: string;
}

interface VersionDetail {
  rarity: number;
  version: Version;
}

interface HeldItem {
  item: Item;
  version_details: VersionDetail[];
}

interface Move {
  name: string;
  url: string;
}

interface MoveLearnMethod {
  name: string;
  url: string;
}

interface VersionGroup {
  name: string;
  url: string;
}

interface VersionGroupDetail {
  level_learned_at: number;
  version_group: VersionGroup;
  move_learn_method: MoveLearnMethod;
}

interface MoveDetail {
  move: Move;
  version_group_details: VersionGroupDetail[];
}

interface Species {
  name: string;
  url: string;
}

interface Sprite {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

interface OtherSprites {
  dream_world: Sprite;
  home: Sprite;
  'official-artwork': Sprite;
  showdown: Sprite;
}

interface Versions {
  'generation-i': GenerationSprites;
  'generation-ii': GenerationSprites;
  'generation-iii': GenerationSprites;
  'generation-iv': GenerationSprites;
  'generation-v': GenerationSprites;
  'generation-vi': GenerationSprites;
  'generation-vii': GenerationSprites;
  'generation-viii': GenerationSprites;
}

interface GenerationSprites {
  'red-blue': Sprite;
  yellow: Sprite;
  crystal: Sprite;
  gold: Sprite;
  silver: Sprite;
  emerald: Sprite;
  'firered-leafgreen': Sprite;
  'ruby-sapphire': Sprite;
  'diamond-pearl': Sprite;
  'heartgold-soulsilver': Sprite;
  platinum: Sprite;
  'black-white': Sprite;
  'omegaruby-alphasapphire': Sprite;
  'x-y': Sprite;
  icons: Sprite;
  'ultra-sun-ultra-moon': Sprite;
}

interface Sprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: OtherSprites;
  versions: Versions;
}

interface Cry {
  latest: string;
  legacy: string;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PastType {
  generation: {
    name: string;
    url: string;
  };
  types: Type[];
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Abilities[];
  forms: Form[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: MoveDetail[];
  species: Species;
  sprites: Sprites;
  cries: Cry;
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
}
