import type { Instrument } from "@/music/library";

type InstrumentsConfig = {
  libraryUrl: string;
  default: Instrument;
};

export const instruments: InstrumentsConfig = {
  libraryUrl: "instruments",
  default: { name: "Piano", tempo: "120" },
};
