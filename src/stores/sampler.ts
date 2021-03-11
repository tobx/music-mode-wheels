import { InstrumentPreset, Library } from "@/music/library";
import { derived, writable } from "svelte/store";

import type { NotePattern } from "@/music/sampler";
import { Sampler } from "@/music/sampler";
import { config } from "@/config";

export const library = new Library(
  config.instruments.libraryUrl,
  config.instruments.index
);

const sampler = new Sampler(library);

const { set: setState, update: updateState, ...state } = writable<
  "initial" | "loading" | "loaded"
>("initial");

export { state };

export const instrumentId = writable(config.instruments.defaultPreset.id);

export const tempo = writable(config.instruments.defaultPreset.tempo);

const preset = derived([instrumentId, tempo], ([id, tempo]) => {
  return { id, tempo };
});

preset.subscribe(async ($preset) => {
  if (library.hasPreset($preset)) {
    setState("loading");
    await sampler.load($preset);
    setState("loaded");
  } else {
    const instrument = library.getInstrument($preset.id);
    if (instrument === undefined) {
      throw new Error("Cannot find instrument with id: " + $preset.id);
    }
    tempo.set(instrument.tempi[0]);
  }
});

export const controller = {
  play: async (pattern: NotePattern) => {
    await sampler.playPattern(pattern);
  },
  stop: async () => {
    await sampler.stop();
  },
  unload: async () => {
    setState("initial");
    await sampler.unload();
  },
};
