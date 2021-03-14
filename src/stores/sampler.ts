import { derived, writable } from "svelte/store";

import { Library } from "@/instruments/library";
import type { NotePattern } from "@/instruments/sampler";
import { Sampler } from "@/instruments/sampler";
import config from "@/config/instruments";

export const library = new Library(config.library.url, config.library.index);

const sampler = new Sampler(library);

const { set: setState, update: updateState, ...state } = writable<
  "initial" | "loading" | "loaded"
>("initial");

export { state };

export const instrumentId = writable(config.defaultPreset.id);

export const tempo = writable(config.defaultPreset.tempo);

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

const stopListeners = new Set<() => void>();

export const controller = {
  play: async (
    pattern: NotePattern,
    noteListener?: (note?: string) => void,
    stopListener?: () => void
  ) => {
    if (stopListener !== undefined) {
      stopListeners.add(stopListener);
    }
    await sampler.playPattern(pattern, noteListener);
    if (stopListener !== undefined) {
      stopListeners.delete(stopListener);
    }
  },
  stop: async () => {
    stopListeners.forEach((listener) => listener());
    stopListeners.clear();
    await sampler.stop();
  },
  unload: async () => {
    setState("initial");
    await sampler.unload();
  },
};
