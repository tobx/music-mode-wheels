import type { Configuration } from "./types";
import index from "./instruments.json";

export const config: Configuration = {
  title: "Music Mode Wheels",
  instruments: {
    libraryUrl: "instruments",
    defaultPreset: { id: "piano", tempo: 120 },
    index,
  },
};
