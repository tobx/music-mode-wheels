import type { InstrumentPreset, LibraryIndex } from "@/music/library";

export type Configuration = {
  title: string;
  instruments: {
    libraryUrl: string;
    defaultPreset: InstrumentPreset;
    index: LibraryIndex;
  };
};
