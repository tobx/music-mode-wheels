import type { LibraryIndex } from "./types";

const libraryIndex: LibraryIndex = {
  piano: {
    name: "Piano",
    presets: [
      { tempo: 60, path: "piano/500ms" },
      { tempo: 120, path: "piano/250ms" },
    ],
  },
  vibraphone: {
    name: "Vibraphone",
    presets: [
      { tempo: 60, path: "vibraphone/500ms" },
      { tempo: 120, path: "vibraphone/250ms" },
    ],
  },
};

export default {
  library: {
    url: "instruments",
    index: libraryIndex,
  },
  defaultPreset: { id: "piano", tempo: 120 },
};
