export type LibraryIndex = {
  [id: string]: {
    name: string;
    presets: {
      tempo: number;
      path: string;
    }[];
  };
};

export type ModeDef = {
  name: string;
  semitones: number;
};
