import type { Configuration } from "./types";
import index from "./instruments.json";

export const config: Configuration = {
  instruments: {
    libraryUrl: "instruments",
    defaultPreset: { id: "piano", tempo: 120 },
    index,
  },
};
