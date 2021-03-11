import type { InstrumentPreset, LibraryIndex } from "@/music/library";

export type Configuration = {
  instruments: {
    libraryUrl: string;
    defaultPreset: InstrumentPreset;
    index: LibraryIndex;
  };
};
