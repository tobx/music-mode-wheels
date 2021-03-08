export type ModeDef = {
  name: string;
  semitones: number;
};

function create(defs: [number, string][]): ModeDef[] {
  return defs.map(([semitones, name]) => ({ name, semitones }));
}

const melodicMajor = create([
  [0, "Ionian"],
  [2, "Dorian"],
  [4, "Phrygian"],
  [5, "Lydian"],
  [7, "Mixolydian"],
  [9, "Aeolian"],
  [11, "Locrian"],
]);

const melodicMinor = create([
  [0, "Melodic minor"],
  [2, "Dorian ♭9"],
  [3, "Lydian aug."],
  [5, "Lydian ♭7"],
  [7, "Mixolydian ♭13"],
  [9, "Aeolian ♭5"],
  [11, "Altered"],
]);

const harmonicMajor = create([
  [0, "Harmonic major"],
  [2, "Dorian ♭5"],
  [4, "Altered ♮5"],
  [5, "Lydian minor"],
  [7, "Mixolydian ♭9"],
  [8, "Lydian aug. ♯9"],
  [11, "Locrian 𝄫7"],
]);

const harmonicMinor = create([
  [0, "Harmonic minor"],
  [2, "Locrian ♮13"],
  [3, "Ionian aug."],
  [5, "Dorian ♯11"],
  [7, "Mixolydian ♭9 ♭13"],
  [8, "Lydian ♯2"],
  [11, "Altered ♭♭7"],
]);

export const modeDefs = {
  melodic: {
    major: melodicMajor,
    minor: melodicMinor,
  },
  harmonic: {
    major: harmonicMajor,
    minor: harmonicMinor,
  },
};
